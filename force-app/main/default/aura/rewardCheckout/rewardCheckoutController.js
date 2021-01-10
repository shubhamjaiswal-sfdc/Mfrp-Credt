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
                component.set("v.conId", conId);
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
    },
    
    handleOnSubmit : function(component, event, helper) {
        event.preventDefault();
        var conId = component.get("v.conId");
        
        var action2 = component.get("c.activeUser");
        action2.setParams({
            "contactId" : conId
        })
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conValue = response.getReturnValue();
                console.log('conValue:' + conValue);
                
                var amount = component.find("amountField");
                var amt = amount.get("v.value");
                console.log('amt :' + amt);
                
                if(amt < conValue.CREDT_Points__c){
                    component.find('rewForm').submit(); //Submit Form
                } else {
                    helper.showErrorToast();
                }
                
            }
        });
        $A.enqueueAction(action2);
    }
})