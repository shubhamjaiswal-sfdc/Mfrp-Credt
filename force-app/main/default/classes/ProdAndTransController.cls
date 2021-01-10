public class ProdAndTransController {
    @AuraEnabled
    public static List<Product2> getProducts(){
        return [SELECT Name, Price__c, ProductCode,DisplayUrl, Family, Description FROM Product2
                WHERE Price__c != NULL
                AND (NOT ProductCode LIKE 'VCH%')];
    }
    
    @AuraEnabled
    public static List<Product2> getRewards(){
        return [SELECT Name, Price__c, ProductCode,DisplayUrl FROM Product2
                WHERE Price__c != NULL
                AND ProductCode LIKE 'VCH%'];
    }
    
    @AuraEnabled
    public static List<Transaction__c> getTransactions(Id contactId){
        return [SELECT Name, Payment_Mode__r.Card_Number__c, Amount__c, Payment_Time__c FROM Transaction__c
                WHERE Customer_Name__c = :contactId
                ORDER BY Payment_Time__c DESC];
    }
    
    @AuraEnabled
    public static List<Credit_Card__c> getCardDetails(Id contactId){
        return [SELECT Name, Bank_Name__r.Name, Card_Number__c, Expiry_Date__c, Limit__c, Remaining_Balance__c FROM Credit_Card__c
                WHERE Owner_Name__c = :contactId
                AND Approval_Status__c = 'Approved'];
    }
    
    @AuraEnabled
    public static Credit_Card__c getCard(Id cardId){
        return [SELECT Bank_Name__r.Name, Card_Number__c, Expiry_Date__c, Card_Holder_Name__c, CVV__c FROM Credit_Card__c
                WHERE Id = :cardId];
    }
    
    @AuraEnabled
    public static List<Reward__c> userRewards(Id contactId){
        return [SELECT Id, Name, Price__c, Redeem_Date_Time__c, Offer__c FROM Reward__c
                WHERE Owner_Name__c = :contactId
                ORDER BY Redeem_Date_Time__c DESC];
    }
}