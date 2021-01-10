({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get('c.getRewards');
        action.setCallback(this, function(response){            
            if(response.getState()=='SUCCESS'){  
                component.set('v.products',response.getReturnValue());
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);

    },
    
    handleOrderProduct : function(component, event, helper) {
        var prod = event.getParam("product");
        component.set("v.productId", prod);
        component.set("v.isOpen", true);
    }
})