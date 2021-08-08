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

        return Evergage.util.resolveWhenTrue.bind(() => {

            if (Evergage.cashDom("#banner2 .banner").length > 0 ) {

                Evergage.DisplayUtils.bind(buildBindId(context));

                Banner2SetState.setState({
                    ctaUrl: context.ctaUrl,
                    subheader: context.subheader,
                    ctaText: context.ctaText,
                    imageURL: context.imageURL,
                    header: context.header,
                    experience : context.experience,
                    userGroup : context.userGroup,
                    campaign : context.campaign
                });

                return true;
            }
        });

    }

    function reset(context, template) {
    }

    function control(context) {
         
         return Evergage.util.resolveWhenTrue.bind(() => {

            if (Evergage.cashDom("#banner2 .banner").length > 0 ) {

                Evergage.DisplayUtils.bind(buildBindId(context));

                Banner2SetState.setState({
                    experience : context.experience,
                    userGroup : context.userGroup,
                    campaign : context.campaign
                });

                return true;
            }
        });

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
