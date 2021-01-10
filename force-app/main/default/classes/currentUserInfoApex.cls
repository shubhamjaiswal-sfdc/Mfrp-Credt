public with sharing class currentUserInfoApex {
    @AuraEnabled 
    public static User fetchUser(){
        User oUser = [SELECT Id, Name, Username, Email, Phone, Street, ContactId, City, State, UserRole.Name, Manager.Name, Manager.Email FROM User 
                      WHERE Id = :userInfo.getUserId()];
        return oUser;
    }
    
    @AuraEnabled
    public static List<Credit_Card__c> fetchMode(Id contactId){
        List<Credit_Card__c> associatedCards = [SELECT Name FROM Credit_Card__c 
                                                WHERE Owner_Name__c = :contactId
                                                AND Approval_Status__c = 'Approved'];
        System.debug(associatedCards);
        return associatedCards;
    }
    
    @AuraEnabled
    public static Id submitOpp(String newName, String newOwner, String cardOwner, String newEmail, String newPhone, String newEmpType, String newLimit, String newExpDate){
        Date newCloseDate = Date.valueOf(newExpDate);
        Opportunity opp = new Opportunity();
        opp.Name = newName;
        opp.Owner_Name__c = newOwner;
        opp.Name_on_Card__c = cardOwner;
        opp.Email__c = newEmail;
        opp.Mobile__c = newPhone;
        opp.Employment_Type__c = newEmpType;
        opp.Limit__c = newLimit;
        opp.CloseDate = newCloseDate;
        if(newEmail != null)
            opp.StageName = 'Applied';
        
        try{
            insert opp;
        } catch(Exception e){
            System.debug(e);
        }
        return opp.Id;
    }
    
    @AuraEnabled	    
    public static List<ContentDocumentLink> fetchFiles(String linkedRecId){
        List<ContentDocumentLink> cdlList = [SELECT ContentDocumentId,ContentDocument.title FROM ContentDocumentLink 
                                             WHERE LinkedEntityId =: linkedRecId];
        return cdlList;	    
    }
    
    @AuraEnabled	    
    public static Contact activeUser(Id contactId){
       Contact con = [SELECT CREDT_Points__c FROM Contact 
                                             WHERE Id = :contactId];
       return con;	    
    }
}