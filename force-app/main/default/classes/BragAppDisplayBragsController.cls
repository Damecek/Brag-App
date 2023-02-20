public without sharing class BragAppDisplayBragsController {
    @AuraEnabled(Cacheable=true)
    public static List<Brag__c> getBrags() {
        return [
                SELECT Id, Title__c, Body__c, Business_Impact__c, Technical_Complexity__c, Date_Completed__c
                FROM Brag__c
                WHERE Published__c = TRUE
                ORDER BY Date_Completed__c DESC
        ];
    }
}