({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.ownId", userValue.ContactId);
                
                var action2 = component.get("c.fetchMode");
                action2.setParams({
                    "contactId" : userValue.ContactId
                })
                action2.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var cardValue = response.getReturnValue();
                        console.log(cardValue);
                        var contactName = component.find("cardField");
                        component.set("v.options", cardValue);
                    }
                });
                $A.enqueueAction(action2);
                
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    },
    
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        var paymentValue = component.get("v.selectedValue");
        var eventFields = event.getParam("fields");
        eventFields["Origin"] = "Web";
        eventFields["Credit_Card__c"] = paymentValue;
        component.set("v.visible", false);
        component.find('myRecordForm').submit(eventFields);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Reported to our Moderators!",
            "message": "We will solve your issue as soon as possible",
            "type": "success",
            "mode": "pester",
            "duration" : 3000
        });
        toastEvent.fire();
    }
})