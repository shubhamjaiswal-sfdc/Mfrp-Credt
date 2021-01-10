({
    closeModal: function(component, event, helper) {
        component.set("v.cardVisible", false);
    },
    
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        setTimeout(function(){
            console.log("!!!")
            var cc = component.get('v.cardID')
            var action = component.get('c.getCard');
            action.setParams({
                "cardId" : cc
            })
            action.setCallback(this, function(response){            
                if(response.getState()=='SUCCESS'){  
                    var resp = response.getReturnValue()
                    component.set('v.cardValue',resp);                    
                    var last5=resp.Card_Number__c.substr(-4);
                    component.set("v.cardNumber", last5);          
                    spinner = component.find("spinner");
                    $A.util.addClass(spinner, "slds-hide");
                }
            });
            $A.enqueueAction(action);
        }, 1000);
    }
})