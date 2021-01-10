trigger RewardTrigger on Reward__c (after insert) {
	if(trigger.isAfter){
        RewardTriggerHandler.updateCredPoints(trigger.new);
    }
}