import {LightningElement, wire} from 'lwc';
import getBrags from '@salesforce/apex/BragAppDisplayBragsController.getBrags';
import {APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe,} from 'lightning/messageService';
import bragAppChannel from '@salesforce/messageChannel/bragApp__c';
import FontAwesome from '@salesforce/resourceUrl/FontAwesome';
import {loadStyle} from 'lightning/platformResourceLoader'

export default class BragAppDisplayBrags extends LightningElement {
    renderedCallback() {
        loadStyle(this, FontAwesome + '/css/all.css')
            .catch(error => {
                console.error(error.message)
            })
    }

    @wire(getBrags)
    wireBrags({error, data}) {
        if (data) {
            this._brags = data.map(brag => {
                const date = new Date(brag.Date_Completed__c);
                const dateCompleted = `${date.getMonth() + 1}/${date.getFullYear()}`;
                return {
                    ...brag,
                    dateCompleted
                }
            });
        } else if (error) {
            console.error(error);
        }
    }

    businessImpact = -1;
    technicalComplexity = -1;

    /** @type {Brag__c[]} */
    _brags;

    get isLoading() {
        return this._brags == null;
    }

    get brags() {
        return this._brags?.filter(brag => {
            return (this.businessImpact === -1 || this.businessImpact <= brag.Business_Impact__c) &&
                (this.technicalComplexity === -1 || this.technicalComplexity <= brag.Technical_Complexity__c);
        });
    }

    get bragsLength() {
        return this.brags?.length;
    }


    @wire(MessageContext)
    messageContext;
    subscription = null;

    handleFilter(message) {
        this[message.filter] = message.value;
    }

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                bragAppChannel,
                (message) => this.handleFilter(message),
                {scope: APPLICATION_SCOPE}
            );
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}