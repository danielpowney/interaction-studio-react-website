(function() {

    /**
     * @function buildBindId
     * @param {Object} context
     * @description Create unique bind ID based on the campaign and experience IDs.
     */
    function buildBindId(context) {
        return `${context.campaign}:${context.experience}`;
    }

    function apply(context, template) {

        myStore.dispatch({ 
            type : 'BANNER_UPDATE', 
            payload : { 
                ctaUrl: context.ctaUrl,
                subheader: context.subheader,
                ctaText: context.ctaText,
                imageURL: context.imageURL,
                header: context.header,
                experience : context.experience,
                userGroup : context.userGroup,
                campaign : context.campaign
            }
        });

        // Start tracking impressions
        document.dispatchEvent(
            new CustomEvent(window.Evergage.CustomEvents.OnTemplateDisplayEnd, {
                detail: {
                    payload: {
                        campaign: context.campaign,
                        experience: context.experience,
                        userGroup: context.userGroup
                    }
                }
            })
        );

    }

    function reset(context, template) {
    }

    function control(context) {
        
        // Add stats tracking data only
        myStore.dispatch({ 
            type : 'BANNER_UPDATE', 
            payload : { 
                experience : context.experience,
                userGroup : context.userGroup,
                campaign : context.campaign
            }
        });

        // Start tracking impressions
        document.dispatchEvent(
            new CustomEvent(window.Evergage.CustomEvents.OnTemplateDisplayEnd, {
                detail: {
                    payload: {
                        campaign: context.campaign,
                        experience: context.experience,
                        userGroup: context.userGroup
                    }
                }
            })
        );

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
