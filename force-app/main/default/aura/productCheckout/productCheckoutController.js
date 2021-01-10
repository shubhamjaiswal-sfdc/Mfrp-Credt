({
    closeModal: function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    
    doInit : function(component, event, helper) {
        
        component.set("v.isOpen", true);
        var prod = component.get("v.productId");
        var productName = component.find("prodField");
        productName.set("v.value", prod.Id);
        
        var amount = component.find("amountField");
        amount.set("v.value", prod.Price__c);
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                var conId = userValue.ContactId;
                
                var action2 = component.get("c.fetchMode");
                action2.setParams({
                    "contactId" : conId
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

                var contactName = component.find("contactField");
                contactName.set("v.value", conId);
            }
        });
        $A.enqueueAction(action);
        
    },
    
    confirmPayment: function(component, event, helper) {
                
        $A.get('e.force:refreshView').fire();
        $A.get("e.force:closeQuickAction").fire();
        
        helper.createTransaction(component);
    }
})