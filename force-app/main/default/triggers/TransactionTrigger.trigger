trigger TransactionTrigger on Transaction__c (after insert) {
	if(trigger.isAfter){
        TransactionTriggerHandler.updateRemainingBalance(trigger.new);
    }
}