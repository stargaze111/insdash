/* * * ./app/comments/components/index.ts * * */
// Imports
import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges
} from '@angular/core';
import 'rxjs/add/operator/take';
import {
    ActivatedRoute,
    Params
} from '@angular/router';
import {
    Location
} from '@angular/common';
import {
    EmitterService
} from '../../emitter.service';
import {
    InsuranceTransactionsResponse
} from '../model/insuranceTransactionsResponse';
import {
    InsuranceTypesSummary
} from '../model/insuranceTypesSummary';
import {
    CompaniesSummary
} from '../model/companiesSummary';
import {
    InsuranceTransactionsResponseData
} from '../model/insuranceTransactionsResponseData';
import {
    InsuranceTransactions
} from '../model/insuranceTransactions';
import {
    InsuranceTransactionsSummary
} from '../model/insuranceTransactionsSummary';
import {
    ErrorData
} from '../model/errorData';
import {
    SearchInsuranceTransactionsService
} from '../services/transactions.service';
import {
    Observable
} from 'rxjs/Observable';
import {
    GoogleChartComponent
} from '../components/googlechart.component';
import * as moment from 'moment';


@Component({
    selector: 'insurance-dashboard-widget',
    templateUrl: './src/app/widgets/dashboard.html'
})


export class InsuranceDashboardComponent implements OnChanges, OnDestroy {

    globalCurrentTime:string;
    grandTotalRevenue=0;
    grandTotalQuotes =0;
    grandTotalPolicies =0;
    totalPolicyAmount=0;
    totalQuotes=0;
    totalPolicies=0;
    selectedOptionId = -1;
    selectedCompanyId = -1;
    selectedInsuranceId = -1;
    selectedChartId = -1;
    isLoaded=false;
    timerSubscription = null;
    toggoleShowHide = "visible";
    live = false;
    exe_id = "";
    typesSummary : InsuranceTypesSummary[];
    companiesSummary : CompaniesSummary[];
    filteredTypesSummary : InsuranceTypesSummary[];
    filteredCompaniesSummary : CompaniesSummary[];    
    insuranceTransactionsResponse: InsuranceTransactionsResponse;
    insuranceTransactions: InsuranceTransactions[];
    insuranceSummary: InsuranceTransactionsSummary;
    filteredInsuranceSummary: InsuranceTransactionsSummary;
    responseData: InsuranceTransactionsResponseData;
    errorData: ErrorData;
    responseStatus: InsuranceTransactionsResponseData;
    search_options = Array < InsuranceDashboardSearchOption > ();
    search_option: InsuranceDashboardSearchOption;
    insurance_types = Array < InsuranceDashboardInsuranceType > ();
    insurance_type: InsuranceDashboardInsuranceType;    
    company_types = Array < InsuranceDashboardCompanyType > ();
    company_type: InsuranceDashboardCompanyType;        
    chart_types = Array < InsuranceDashboardChartType > ();
    chart_type: InsuranceDashboardChartType; 
    dashboard_googlechart1 = new DashboardGoogleChartComponent();
    fromMilliseconds = "";
    toMilliseconds = "";
    selectedFromTime=null;
    selectedToTime=null;

    date;

    filteredPieChartData = this.dashboard_googlechart1.createDataTable([
        []
    ]);
    
    summaryPieChartData = this.dashboard_googlechart1.createDataTable([
            []
    ]);
    
    insTypeSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                []
    ]);
    
    insRevSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);
    
    companySummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);

    companyRevSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);


    filteredInsTypeSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                []
    ]);
    
    filteredInsRevSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);
    
    filteredCompanySummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);

    filteredCompanyRevSummaryPieChartData = this.dashboard_googlechart1.createDataTable([
                    []
    ]);

    filteredLineChartData = this.dashboard_googlechart1.createDataTable([
        []
    ]);

    linechartoptions = {
        'width': 1050,
        'height': 500,
        'bars': 'vertical',        
        'chartArea': {
            'left': 100,
            'bottom': 175,
            'right': 150,
            'top': 50
        },
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Count'
        }
    }
    pieChartOptions1 = {
        'width': 340,
        'height': 200,
        title: 'Quotes & Policies',        
        'chartArea': {
	            'left': 30,
	            'bottom': 20,
	            'right': 40,
	            'top': 20
        },
    };    

    pieChartOptions2 = {
        'width': 340,
        'height': 200,
        title: 'Quotes & Policies',        
        'chartArea': {
	            'left': 30,
	            'bottom': 20,
	            'right': 40,
	            'top': 30
        },
    };    

    pieChartOptions3 = {
        'width': 340,
        'height': 200,
        title: 'Insurance & Policies',        
        'chartArea': {
	            'left': 30,
	            'bottom': 20,
	            'right': 40,
	            'top': 30
        },
    }; 
    
    pieChartOptions4 = {
        'width': 340,
        'height': 200,
        title: 'Insurance & Amount',        
        'chartArea': {
	            'left': 30,
	            'bottom': 20,
	            'right': 40,
	            'top': 30
        },
    };    
    
	pieChartOptions5 = {
	    'width': 340,
	    'height': 200,
	    title: 'Company & Policies',
	    'chartArea': {
		    'left': 30,
		    'bottom': 20,
		    'right': 40,
		    'top': 30
	    },
	}; 

	pieChartOptions6 = {
	    'width': 340,
	    'height': 200,
	    title: 'Company & Amount',        
	    'chartArea': {
		    'left': 30,
		    'bottom': 20,
		    'right': 40,
		    'top': 30
	    },
    }; 

    drawFilteredGraph() {

        this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createLineChart(document.getElementById('line_chart'));
        this.dashboard_googlechart1.chart.draw(this.filteredLineChartData, this.linechartoptions);

        this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('filtered_pie_chart'));
        this.dashboard_googlechart1.chart.draw(this.filteredPieChartData, this.pieChartOptions1);
        
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('filtered_ins_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.filteredInsTypeSummaryPieChartData, this.pieChartOptions3);
            
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('filtered_ins_rev_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.filteredInsRevSummaryPieChartData, this.pieChartOptions4);
            
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('filtered_company_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.filteredCompanySummaryPieChartData, this.pieChartOptions5);
           
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('filtered_company_rev_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.filteredCompanyRevSummaryPieChartData, this.pieChartOptions6);        


    }
    
    drawSummaryGraph() {
    
           
            this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('summary_pie_chart'));
            this.dashboard_googlechart1.chart.draw(this.summaryPieChartData, this.pieChartOptions2);
            
            
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('ins_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.insTypeSummaryPieChartData, this.pieChartOptions3);
            
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('ins_rev_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.insRevSummaryPieChartData, this.pieChartOptions4);
            
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('company_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.companySummaryPieChartData, this.pieChartOptions5);
           
	    this.dashboard_googlechart1.chart = this.dashboard_googlechart1.createPieChart(document.getElementById('company_rev_pie_chart'));
	    this.dashboard_googlechart1.chart.draw(this.companyRevSummaryPieChartData, this.pieChartOptions6);
            
    }


    constructor(private searchInsuranceTransactionsService: SearchInsuranceTransactionsService, private route: ActivatedRoute,
        private location: Location
    ) {
        
    }


    ngOnInit() {
    
        
        //initialize dropdowns
        this.initializeDropdowns();
        // Load comments
        
        this.triggerSearch();
       
        setInterval(() => {
            this.date = new Date();
        }, 1000);


    }

    initializeDropdowns() {
        this.search_options = Array < InsuranceDashboardSearchOption > ();
        this.search_options.push(new InsuranceDashboardSearchOption(-1, 'Please select'));
        this.search_options.push(new InsuranceDashboardSearchOption(1, 'Live Transactions'));
        this.search_options.push(new InsuranceDashboardSearchOption(2, 'Last 5 minutes'));
        this.search_options.push(new InsuranceDashboardSearchOption(3, 'Last 10 minutes'));
        this.search_options.push(new InsuranceDashboardSearchOption(4, 'Last 30 minutes'));
        this.search_options.push(new InsuranceDashboardSearchOption(5, 'Last 1 hour'));
        this.search_options.push(new InsuranceDashboardSearchOption(6, 'Last 3 hours'));
        this.search_options.push(new InsuranceDashboardSearchOption(7, 'Last 6 hours'));
        this.search_options.push(new InsuranceDashboardSearchOption(8, 'Last 12 hours'));
        this.search_options.push(new InsuranceDashboardSearchOption(9, 'Last 24 hours'));
        this.search_options.push(new InsuranceDashboardSearchOption(10, 'Last 1 week'));
        this.search_options.push(new InsuranceDashboardSearchOption(11, 'Last 1 month'));
        this.search_option = new InsuranceDashboardSearchOption(-1, ' ');

        this.insurance_types = Array < InsuranceDashboardInsuranceType > ();
	this.insurance_types.push(new InsuranceDashboardInsuranceType(-1, 'All'));
	this.insurance_types.push(new InsuranceDashboardInsuranceType(1, 'Ride Sharing'));
	this.insurance_types.push(new InsuranceDashboardInsuranceType(2, 'Food Delivery'));
        this.insurance_types.push(new InsuranceDashboardInsuranceType(3, 'Rental Car'));
        this.insurance_types.push(new InsuranceDashboardInsuranceType(4, 'Holiday Travel'));
        this.insurance_type = new InsuranceDashboardInsuranceType(-1, ' ');

        this.company_types = Array < InsuranceDashboardCompanyType > ();
	this.company_types.push(new InsuranceDashboardCompanyType(-1, 'All'));
	this.company_types.push(new InsuranceDashboardCompanyType(1, 'Tuber'));
	this.company_types.push(new InsuranceDashboardCompanyType(2, 'Delivermoo'));
        this.company_types.push(new InsuranceDashboardCompanyType(3, 'GoGet'));
        this.company_types.push(new InsuranceDashboardCompanyType(4, 'Menulog'));
        this.company_types.push(new InsuranceDashboardCompanyType(5, 'SMS Insurance'));
        this.company_type = new InsuranceDashboardCompanyType(-1, ' ');
        
        this.chart_types = Array < InsuranceDashboardChartType > ();
	this.chart_types.push(new InsuranceDashboardChartType(-1, 'Please select'));
	this.chart_types.push(new InsuranceDashboardChartType(1, 'Full Summary'));
	this.chart_types.push(new InsuranceDashboardChartType(2, 'Recent Transactions'));
	this.chart_types.push(new InsuranceDashboardChartType(3, 'All'));
        this.chart_type = new InsuranceDashboardChartType(-1, ' ');        

    }
    
    


    selectInsuranceType(selectedInsurance) {
    this.selectedInsuranceId = selectedInsurance;
    if(selectedInsurance!=-1){         
        console.log('insurance: ' + JSON.stringify(selectedInsurance)+":"+this.insurance_types[parseInt(selectedInsurance)].name);
        
    }else{
        console.log('None selected');
    }
          this.triggerSearch(); 
    }
    
    selectCompanyType(selectedCompany) {
    this.selectedCompanyId = selectedCompany;
    if(selectedCompany!=-1){
        console.log('company: ' + JSON.stringify(selectedCompany)+":"+this.company_types[parseInt(selectedCompany)].name);
        
    }else{
            console.log('None selected');
    }
       this.triggerSearch();     
    }    

    selectChartType(selectedChart) {
        this.selectedChartId = selectedChart;
        if(selectedChart!=-1){         
            console.log('chart: ' + JSON.stringify(selectedChart)+":"+this.chart_types[parseInt(selectedChart)].name);
            //this.triggerSearch();
        }else{
            console.log('None selected');
        }               
    }

    selectSearchOption(selectedOption) {
    this.selectedOptionId = parseInt(selectedOption);
    this.triggerSearch();
    if(selectedOption!=-1){
       console.log('selected: ' + JSON.stringify(selectedOption)+":"+this.search_options[parseInt(selectedOption)].name);            
      }else{
            console.log('None selected');
            this.unsubscribeToData();
    }
       

    }


    reset_clicked() {
          console.log('Reset Clicked ');
	  this.totalPolicyAmount=0; 
	  this.totalQuotes=0;
	  this.totalPolicies=0;
	  this.selectedOptionId = 2;
	  this.selectedCompanyId = -1;
	  this.selectedInsuranceId = -1;
	  this.selectedChartId = -1;
	  this.live = false;
          this.exe_id = "";
          this.search_option = new InsuranceDashboardSearchOption(-1, '');
          this.insurance_type = new InsuranceDashboardInsuranceType(-1, '');
          this.company_type = new InsuranceDashboardCompanyType(-1, '');
          this.chart_type = new InsuranceDashboardChartType(-1, '');
          this.isLoaded = false;  
          this.fromMilliseconds="";
          this.toMilliseconds="";
          this.selectedFromTime=new Date();
          this.selectedToTime=new Date();
          this.selectedFromTime=null;
          this.selectedToTime=null;
          this.unsubscribeToData();
          this.triggerSearch();

    }


    search_clicked(value) {
    
        console.log('Search Clicked '+value);
        
        if(value!=null&&value!=""){                
		this.exe_id = value;
        }
        
        this.triggerSearch();
        
   }
   
   triggerSearch(){
   
       console.log('selectedOption :'+this.selectedOptionId);
       console.log('fromMilliseconds :'+this.fromMilliseconds);
   
       if(this.selectedOptionId==-1){
	      this.selectedOptionId=2;
	      this.search_option = new InsuranceDashboardSearchOption(2, 'Last 5 minutes');
	}
   	let selectedInsurance = "";
   	let selectedCompany = "";
   
   	if(this.selectedInsuranceId!=-1){
   	  selectedInsurance =this.insurance_types[this.selectedInsuranceId].name
   	}
   	if(this.selectedCompanyId!=-1){
   	  selectedCompany =this.company_types[this.selectedCompanyId].name
   	}
   	
   	let toTimeInMilliSeconds = -1;
   	if((this.selectedFromTime!=null)||(this.selectedToTime!=null)){
	console.log('provided date range :'+this.selectedFromTime); 
	 var currentDate = new Date();   	 
	 let fromTimeInMilliSeconds = currentDate.getTime();
	 
	 if((this.selectedFromTime!=null)){
	    //let fromTimeString = this.getTimeInMillisecondsString(this.selectedFromTime);
	    fromTimeInMilliSeconds = new Date(this.selectedFromTime).getTime();
	    this.fromMilliseconds = fromTimeInMilliSeconds+"";
	 }
	 
	 if((this.selectedToTime!=null)){
	 	    //let toTimeString = this.getTimeInMillisecondsString(this.selectedToTime);
	 	    toTimeInMilliSeconds = new Date(this.selectedToTime).getTime();
	 	    this.toMilliseconds = toTimeInMilliSeconds+"";
	 }
	 

   	 this.searchTransactions(this.selectedOptionId,0, fromTimeInMilliSeconds,toTimeInMilliSeconds,0,selectedInsurance,selectedCompany,null);
         console.log('Subscribe for periodically refreshing data');
        
   	  
   	}else{
   	
   	
   	
           
           //start live dashboard with filters
   	   var currentDate = new Date();
   	    currentDate.setSeconds(0);
   	    let currentTimeInMilliSeconds = currentDate.getTime();
   	    this.globalCurrentTime = this.getTimestampString(currentDate);
   	    let fromTimeInMilliSeconds = -1;
   	    let dataPointFactor = 1;
   	    let dataPointFactor1 = 0;
   	    let dataPoints1 = 0;
   	    let dataPoints2 = 60;   	    
   
   	    if (this.selectedOptionId == 1) {
   		this.fromMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * (2) * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000*1));
   		this.live = true;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Subscribe for periodically refreshing data');
   	    }else if (this.selectedOptionId == 2) {
   		this.fromMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 5 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000*5));
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 3) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 10 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 10));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 4) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 30 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 30));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 5) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 60 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 60));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 6) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 180 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 180));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 7) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 360 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 360));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 8) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 720 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 720));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 9) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 1440 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 1440));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   	    } else if (this.selectedOptionId == 10) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 10080 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 10080));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   
   	    } else if (this.selectedOptionId == 11) {
   		this.toMilliseconds = currentTimeInMilliSeconds + "";
   		dataPointFactor = dataPointFactor * 300080 * 1000;
   		fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000 * 300080));
   		this.fromMilliseconds = fromTimeInMilliSeconds + "";
   		this.live = false;
   		this.searchTransactions(this.selectedOptionId,dataPointFactor1, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints1,selectedInsurance,selectedCompany,this.exe_id);
   		console.log('Unsubscribe from periodically refreshing data');
   
   	    } else {
   		console.log('Unsubscribe from periodically refreshing data');
   
	    }
	    
	    }
   
   }


    searchTransactions(selectedOption,dataPointFactor, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints,selectedInsurance,selectedCompany,exeId): void {
        this.unsubscribeToData();
	this.insuranceTransactionsResponse=null;
	this.filteredTypesSummary=[];
	this.filteredCompaniesSummary=[];
	this.typesSummary=[];
	this.companiesSummary=[];
	this.responseData=null;

        this.globalCurrentTime = this.getTimestampString(new Date());
        this.searchTransactionsSummary(selectedInsurance,selectedCompany, exeId);
        console.log('selectedOption :'+selectedOption);
        console.log('fromMilliseconds :'+this.fromMilliseconds);
        console.log('toMilliseconds :'+this.toMilliseconds);
        
        this.searchInsuranceTransactionsService.searchTransactions(this.fromMilliseconds, this.toMilliseconds,selectedInsurance,selectedCompany, exeId).subscribe(
            insuranceTransactionsResponse => {


                this.insuranceTransactionsResponse = insuranceTransactionsResponse;
                if (insuranceTransactionsResponse != null && insuranceTransactionsResponse.status != null && 'SUCCESS' == insuranceTransactionsResponse.status.toUpperCase()) {
                    this.responseData = insuranceTransactionsResponse.data;

                    if (this.responseData != null) {
                        this.insuranceSummary = this.responseData.summary;
                        this.insuranceTransactions = this.responseData.transactions;
                        console.log('Number of transactions : ' + this.insuranceTransactions.length);
                        
                        
			this.filteredInsuranceSummary = this.responseData.summary;                        
			let groupsSummary = this.responseData.groupsSummary;
			if(groupsSummary!=null){
			this.filteredTypesSummary = groupsSummary.insuranceTypeSummary;
			this.filteredCompaniesSummary = groupsSummary.companiesSummary;
			}
			//console.log('summary : ' + JSON.stringify(this.filteredInsuranceSummary));
			//console.log('typesSummary : ' + JSON.stringify(this.filteredTypesSummary));
                        //console.log('companiesSummary : ' + JSON.stringify(this.filteredCompaniesSummary));
                        
                        this.updateFilteredChart(selectedOption,dataPointFactor, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints,selectedInsurance,selectedCompany,exeId);
                    } else {
                        console.log('Invalid Response Data');
		        this.insuranceTransactionsResponse=null;
		        this.filteredTypesSummary=[];
		        this.filteredCompaniesSummary=[];                        
                    }
                } else {
                    this.errorData = insuranceTransactionsResponse.error;
                    this.insuranceTransactionsResponse=null;
                    this.filteredTypesSummary=[];
                    this.filteredCompaniesSummary=[];
                    
                }



            },
            err => {
                // Log errors if any
                console.log(err);
            });    
            
            
        if (this.live) {
            console.log('Subscribe from periodically refreshing data');
            this.subscribeToData(selectedOption,dataPointFactor, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints,selectedInsurance,selectedCompany,exeId);
        }
        
        
        
    }
    
    searchTransactionsSummary(selectedInsurance,selectedCompany, exeId): void {
        
        this.searchInsuranceTransactionsService.searchTransactionsSummary(selectedInsurance,selectedCompany, exeId).subscribe(
            insuranceTransactionsResponse => {


                this.insuranceTransactionsResponse = insuranceTransactionsResponse;
                if (insuranceTransactionsResponse != null && insuranceTransactionsResponse.status != null && 'SUCCESS' == insuranceTransactionsResponse.status.toUpperCase()) {
                    this.responseData = insuranceTransactionsResponse.data;

                    if (this.responseData != null) {
                        this.insuranceSummary = this.responseData.summary;                        
                        let groupsSummary = this.responseData.groupsSummary;
                        if(groupsSummary!=null){
                        this.typesSummary = groupsSummary.insuranceTypeSummary;
                        this.companiesSummary = groupsSummary.companiesSummary;
                        }
                        //console.log('summary : ' + JSON.stringify(this.insuranceSummary));
                        //console.log('typesSummary : ' + JSON.stringify(this.typesSummary));
                        //console.log('companiesSummary : ' + JSON.stringify(this.companiesSummary));
                        this.updateSummaryChart();
                        this.isLoaded = true;       
                    } else {
                        console.log('Invalid Response Data');
                        this.typesSummary=[];
                        this.companiesSummary=[];
                        this.responseData=null;
                    }
                } else {
                    this.errorData = insuranceTransactionsResponse.error;
                    this.typesSummary=[];
                    this.companiesSummary=[];
                    this.responseData=null;
                }



            },
            err => {
                // Log errors if any
                console.log(err);
            });

      
    }    


    subscribeToData(selectedOption,dataPointFactor, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints,selectedInsurance,selectedCompany,exeId): void {
        let refreshFrequency = 2000;
        let currentDate = new Date();
        currentDate.setSeconds(0);
        let currentTimeInMilliSeconds = currentDate.getTime();
        fromTimeInMilliSeconds = (currentTimeInMilliSeconds - (60000*1));
        //this.fromMilliseconds=fromTimeInMilliSeconds+"";
        this.timerSubscription = Observable.timer(refreshFrequency).first().subscribe(() => this.searchTransactions(selectedOption,0, fromTimeInMilliSeconds,toTimeInMilliSeconds,0,selectedInsurance,selectedCompany,exeId));
    }

    

    unsubscribeToData(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribeToData();
    }

    ngOnChanges(changes: any) {
    }
    
    updateSummaryChart(): void {
        console.log('Updating Summary Charts....');
            let totalQuotesCount = parseFloat(this.insuranceSummary.quotesCount);
            let totalPoliciesCount = parseFloat(this.insuranceSummary.policiesCount);
            
            console.log('totalQuotesCount :'+totalQuotesCount);
            console.log('totalPoliciesCount :'+totalPoliciesCount);
            
	    let pieChartData = [[]];        
	    pieChartData.push(["Quotes(unused)="+(totalQuotesCount-totalPoliciesCount), (totalQuotesCount-totalPoliciesCount) ], ["Policies="+totalPoliciesCount, totalPoliciesCount ]);
	    pieChartData[0] = ["Label", "Count"];
            this.grandTotalQuotes =totalQuotesCount; 
            this.grandTotalPolicies =totalPoliciesCount; 
            this.grandTotalRevenue =parseFloat(this.insuranceSummary.totalPoliciesAmount);
	   
	    	    
            let typesPieChartData = [[]];
            let typesRevPieChartData = [[]]; 
           if(this.typesSummary!=null){
            let typesLength = this.typesSummary.length;
            for(let e=0;e<typesLength;e++){
            let floatData = (parseFloat(this.typesSummary[e].totalPoliciesAmount)).toFixed(2);
               typesPieChartData.push([this.typesSummary[e].name+"="+this.typesSummary[e].policiesCount, Number(this.typesSummary[e].policiesCount) ]);	   
               typesRevPieChartData.push([(this.typesSummary[e].name+"="+floatData), Number(floatData+"") ]);	               
            }
           }
           typesPieChartData[0] = ["Insurance", "Policies"];
           typesRevPieChartData[0] = ["Insurance", "Amount"];
           //console.log('typesPieChartData :'+JSON.stringify(typesPieChartData));
           //console.log('typesRevPieChartData :'+JSON.stringify(typesRevPieChartData));
           
            let companiesPieChartData = [[]];
            let companiesRevPieChartData = [[]]; 
           if(this.companiesSummary!=null){
            let companiesLength = this.companiesSummary.length;
            for(let e=0;e<companiesLength;e++){
            let floatData = (parseFloat(this.companiesSummary[e].totalPoliciesAmount)).toFixed(2);
               companiesPieChartData.push([this.companiesSummary[e].name+"="+this.companiesSummary[e].policiesCount, Number(this.companiesSummary[e].policiesCount) ]);	   
               companiesRevPieChartData.push([(this.companiesSummary[e].name+"="+floatData), Number(floatData+"") ]);	               
            }
           }
           companiesPieChartData[0] = ["Company", "Policies"];
           companiesRevPieChartData[0] = ["Company", "Amount"];    	    

           //console.log('companiesPieChartData :'+JSON.stringify(companiesPieChartData));
           //console.log('companiesRevPieChartData :'+JSON.stringify(companiesRevPieChartData));
	    
	    this.summaryPieChartData = this.dashboard_googlechart1.createDataTable(pieChartData);
	    this.insTypeSummaryPieChartData=this.dashboard_googlechart1.createDataTable(typesPieChartData);
	    this.insRevSummaryPieChartData =this.dashboard_googlechart1.createDataTable(typesRevPieChartData);
	    this.companySummaryPieChartData =this.dashboard_googlechart1.createDataTable(companiesPieChartData);
	    this.companyRevSummaryPieChartData =this.dashboard_googlechart1.createDataTable(companiesRevPieChartData);
	     
	    
            this.drawSummaryGraph();
        
    }

    updateFilteredChart(selectedOption,dataPointFactor, fromTimeInMilliSeconds,toTimeInMilliSeconds,dataPoints,selectedInsurance,selectedCompany,exeId): void {

        console.log('Number of transactions :' + this.insuranceTransactions.length);
        console.log('dataPointFactor :' + dataPointFactor);
        console.log('fromTimeInMilliSeconds :' + fromTimeInMilliSeconds);
                    
    	let isOnlyTimeRequired = false;
    	var fromDay = (new Date(fromTimeInMilliSeconds)).getDate();
    	var today = (new Date()).getDate();
    	var noOfDataPoints = this.insuranceTransactions.length;
    	isOnlyTimeRequired=(fromDay==today);
    	
    	console.log('fromDay :'+fromDay);
    	console.log('today :'+today);
    	console.log('isOnlyTimeRequired :'+isOnlyTimeRequired);       
            
   
            let totalQuotesCount = 0;
            let totalPoliciesCount = 0;
            let totalRevenue = 0.00;
            let techData1 = [];
    
            
            let techData = _.groupBy(this.insuranceTransactions, function(item) {
    
                let displayDateStr = null;
    
                //check this later
                if (item!=null&&item.modified != null) {                 
                    let dateInMilliSeconds = item.modified;       
                    var now = new Date(dateInMilliSeconds);                
                    var date2 = [now.getFullYear(), now.getMonth()+1, now.getDate()];
                    var time2 = [now.getHours(), now.getMinutes(), now.getSeconds()];
    
    
                    // If seconds and minutes are less than 10, add a zero
                    var time1 = [];
                    for (var i = 0; i < 3; i++) {
    
                        if (time2[i] < 10) {
    
                            time1.push("0" + time2[i]);
    
                        } else {
                            time1.push(time2[i]);
                        }
    
                    }
    
                    var date1 = [];
                    for (var i = 0; i < 3; i++) {
    
                        if (date2[i] < 10) {
    
                            date1.push("0" + date2[i]);
    
                        } else {
                            date1.push(date2[i]);
                        }
    
                    }
    
                    displayDateStr = date1.join("-") + " " + time1.join(":");
                }
    
                //console.log("displayDateStr :" + displayDateStr);
                return displayDateStr;
            });
    
           //console.log('techData :'+JSON.stringify(techData));
              
    
            _.each(techData, function(value, key) {
                let quotesCount = value.length;
                totalQuotesCount = totalQuotesCount + quotesCount;
                let policiesCount = 0;
                
    
                for (let t = 0; t < quotesCount; t++) {
                    if (value[t] != null && value[t].policyId != null) {
                        policiesCount = policiesCount + 1;
                        totalPoliciesCount = totalPoliciesCount + 1;
                        totalRevenue = parseFloat(value[t].policyAmount) + totalRevenue;
                    }
    
                }
    
                if (key != null && key != 'Invalid date') {
                    
                    let date = new Date(key);
                    let timeInMilliseconds = date.getTime();
                    techData1.push({
                        "dateTime": key,
                        "timeInMilliseconds": timeInMilliseconds,
                        "quotesCount": quotesCount,
                        "policiesCount": policiesCount
                    });
                }
            });
    
            let techData2 = _.sortBy(techData1, function(obj) {
                return [obj.timeInMilliseconds]
            });
    
    
            let tempLineChartData = [
                []
            ];
             
            if (techData2.length > 0) {
                _.each(techData2, function(value, key) {
                    let chartDateTime = value.dateTime; 
                   // console.log('chartDateTime:'+chartDateTime);
                    if(chartDateTime!=null&&"null"!==chartDateTime){
                    tempLineChartData.push([chartDateTime, value.quotesCount, value.policiesCount]);
                    }
                });
    
            }
          
            for (let r = 1; r < tempLineChartData.length; r++) {
                      if(isOnlyTimeRequired){
                                   var dateTime = "";                               
                      	       dateTime = tempLineChartData[r][0]+"";
    	   		       var parts = dateTime.split(' ');
    	   		       tempLineChartData[r][0] = parts[1]; 
                      }
            }
            
             if(tempLineChartData.length<=1){
	                  totalQuotesCount=0;
	                  var now = new Date(fromTimeInMilliSeconds);                
	    	                          var date2 = [now.getFullYear(), now.getMonth()+1, now.getDate()];
	    	                          var time2 = [now.getHours(), now.getMinutes(), now.getSeconds()];
	    	          
	    	          
	    	                          // If seconds and minutes are less than 10, add a zero
	    	                          var time1 = [];
	    	                          for (var i = 0; i < 3; i++) {
	    	          
	    	                              if (time2[i] < 10) {
	    	          
	    	                                  time1.push("0" + time2[i]);
	    	          
	    	                              } else {
	    	                                  time1.push(time2[i]);
	    	                              }
	    	          
	    	                          }
	    	          
	    	                          var date1 = [];
	    	                          for (var i = 0; i < 3; i++) {
	    	          
	    	                              if (date2[i] < 10) {
	    	          
	    	                                  date1.push("0" + date2[i]);
	    	          
	    	                              } else {
	    	                                  date1.push(date2[i]);
	    	                              }
	    	          
	                        }
	                  tempLineChartData.push([time1.join(":"),0,0]);
            }
            
            
            //console.log('tempLineChartData is reloaded with records count : ' + JSON.stringify(tempLineChartData));
      	   // console.log('tempLineChartData count : ' + tempLineChartData.length);
      	   
      	   
            tempLineChartData[0] = ["Time", "Quotes", "Policies"];
            this.filteredLineChartData = this.dashboard_googlechart1.createDataTable(tempLineChartData);
            this.totalPolicyAmount = totalRevenue;
           
            this.totalQuotes = totalQuotesCount;
            this.totalPolicies = totalPoliciesCount;
            let pieChartData = [[]];        
            pieChartData.push(["Quotes(unused)="+(totalQuotesCount-totalPoliciesCount), (totalQuotesCount-totalPoliciesCount) ], ["Policies="+totalPoliciesCount, totalPoliciesCount ]);
            pieChartData[0] = ["Label", "Count"];
    
            
                        let typesPieChartData = [[]];
	                let typesRevPieChartData = [[]]; 
	               if(this.filteredTypesSummary!=null){
	                let typesLength = this.filteredTypesSummary.length;
	                for(let e=0;e<typesLength;e++){
	                let floatData = (parseFloat(this.filteredTypesSummary[e].totalPoliciesAmount)).toFixed(2);
	                   typesPieChartData.push([this.filteredTypesSummary[e].name+"="+this.filteredTypesSummary[e].policiesCount, Number(this.filteredTypesSummary[e].policiesCount) ]);	   
	                   typesRevPieChartData.push([(this.filteredTypesSummary[e].name+"="+floatData), Number(floatData+"") ]);	               
	                }
	               }
	               typesPieChartData[0] = ["Insurance", "Policies"];
	               typesRevPieChartData[0] = ["Insurance", "Amount"];
	               //console.log('typesPieChartData :'+JSON.stringify(typesPieChartData));
                       //console.log('typesRevPieChartData :'+JSON.stringify(typesRevPieChartData));
            
            
            
                        let companiesPieChartData = [[]];
	                let companiesRevPieChartData = [[]]; 
	               if(this.filteredCompaniesSummary!=null){
	                let companiesLength = this.filteredCompaniesSummary.length;
	                for(let e=0;e<companiesLength;e++){
	                let floatData = (parseFloat(this.filteredCompaniesSummary[e].totalPoliciesAmount)).toFixed(2);
	                   companiesPieChartData.push([this.filteredCompaniesSummary[e].name+"="+this.filteredCompaniesSummary[e].policiesCount, Number(this.filteredCompaniesSummary[e].policiesCount) ]);	   
	                   companiesRevPieChartData.push([(this.filteredCompaniesSummary[e].name+"="+floatData), Number(floatData+"") ]);	               
	                }
	               }
	               companiesPieChartData[0] = ["Company", "Policies"];
	               companiesRevPieChartData[0] = ["Company", "Amount"];    	    
	    
	              // console.log('companiesPieChartData :'+JSON.stringify(companiesPieChartData));
	              // console.log('companiesRevPieChartData :'+JSON.stringify(companiesRevPieChartData));
	    	    
	    	    this.filteredPieChartData = this.dashboard_googlechart1.createDataTable(pieChartData);            
	    	    this.filteredInsTypeSummaryPieChartData=this.dashboard_googlechart1.createDataTable(typesPieChartData);
	    	    this.filteredInsRevSummaryPieChartData =this.dashboard_googlechart1.createDataTable(typesRevPieChartData);
	    	    this.filteredCompanySummaryPieChartData =this.dashboard_googlechart1.createDataTable(companiesPieChartData);
	    	    this.filteredCompanyRevSummaryPieChartData =this.dashboard_googlechart1.createDataTable(companiesRevPieChartData);
	    	     
	    
            
            
            
            this.drawFilteredGraph();
    
   
    
    }

getTimestampString(now) : string{

var date2 = [now.getFullYear(), now.getMonth()+1, now.getDate()];
                    var time2 = [now.getHours(), now.getMinutes(), now.getSeconds()];
    
    
                    // If seconds and minutes are less than 10, add a zero
                    var time1 = [];
                    for (var i = 0; i < 3; i++) {
    
                        if (time2[i] < 10) {
    
                            time1.push("0" + time2[i]);
    
                        } else {
                            time1.push(time2[i]);
                        }
    
                    }
    
                    var date1 = [];
                    for (var i = 0; i < 3; i++) {
    
                        if (date2[i] < 10) {
    
                            date1.push("0" + date2[i]);
    
                        } else {
                            date1.push(date2[i]);
                        }
    
                    }
return  date1.join("-") + " " + time1.join(":");
              
}

getTimeInMillisecondsString(now) : string{

var parts = now.split(' ');
var parts1 = parts[0].split('/');
var parts2 = parts[1].split(':');

return  parts1.join("-") + " " + parts2.join(":")+":"+"00";
              
}

}

export class DashboardGoogleChartComponent extends GoogleChartComponent {
  
  chart;
  constructor(){
      super();
    }
}


export class InsuranceDashboardSearchOption {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    id: number;
    name: string;
}

export class InsuranceDashboardInsuranceType {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    id: number;
    name: string;
}

export class InsuranceDashboardCompanyType {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    id: number;
    name: string;
}

export class InsuranceDashboardChartType {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    id: number;
    name: string;
}