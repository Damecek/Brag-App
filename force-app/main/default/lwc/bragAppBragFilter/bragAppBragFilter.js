import {LightningElement, wire} from 'lwc';
import bragAppChannel from '@salesforce/messageChannel/bragApp__c';
import {MessageContext, publish} from "lightning/messageService";

export default class BragAppBragFilter extends LightningElement {
    businessImpact = -1;
    technicalComplexity = -1;

    @wire(MessageContext)
    messageContext;
    
    handleChange(event) {
        const payload = { filter: event.target.name, value: event.detail };
        publish(this.messageContext, bragAppChannel, payload);
    }
}