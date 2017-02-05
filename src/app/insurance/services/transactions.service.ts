// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { InsuranceTransactionsResponse }           from '../model/insuranceTransactionsResponse';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchInsuranceTransactionsService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     
     private client_id = 'UMPB1q9XBKudOD58cyVYACOp22a5OjgY';
     
     // private instance variable to hold base url
     private transactionsUrl = 'https://smsapigee-test.apigee.net/v3/insurance/transactions/search'; 

     searchTransactions(fromMilliseconds,toMilliseconds,selectedInsurance,selectedCompany, exeId) : Observable<InsuranceTransactionsResponse> {
          
     let headers = new Headers({ 'Content-Type': 'application/json','client_id':this.client_id });
     let options = new RequestOptions({headers: headers});     
     let toMilliSecondsStr = "";
     let fromMilliSecondsStr = "";
     
     if(fromMilliseconds>=0){
        fromMilliSecondsStr = fromMilliseconds+"";
     }
     
     let body:string = JSON.stringify( {"transactionsRequired":"true","executionId":exeId,"fromMilliseconds":fromMilliSecondsStr,"toMilliseconds":toMilliSecondsStr,"recordLimit":"20000","insuranceType":selectedInsurance,"company":selectedCompany} ); 
     console.log('requesting transactions data...');   
     return this.http.post(this.transactionsUrl, body, options)
                          .map((res:Response) => res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     
     
     }
     
    searchTransactionsSummary(selectedInsurance,selectedCompany, exeId) : Observable<InsuranceTransactionsResponse> {

	  let headers = new Headers({ 'Content-Type': 'application/json','client_id':this.client_id });
	  let options = new RequestOptions({headers: headers});     

	     let body:string = JSON.stringify( {"transactionsRequired":"false","executionId":exeId,"insuranceType":selectedInsurance,"company":selectedCompany} ); 
 
	  console.log('requesting summary data...');   
	  return this.http.post(this.transactionsUrl, body, options)
			       .map((res:Response) => res.json())
			       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
          
          
     }

}