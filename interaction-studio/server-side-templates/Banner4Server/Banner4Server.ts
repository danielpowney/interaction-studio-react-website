export class StyleField {
    label: string;
    className: string;
}

export class Banner4Server implements CampaignTemplateComponent {

    @title("Background Image URL")
    @subtitle("Replace the placeholder image URL with the image URL for your background image.")
    imageURL: string = "https://cdn.evergage.com/evergage-content/nto/nto_hero_banner_bike.jpg";

    @subtitle("Optional text field")
    header: string = "Header Text";

    @subtitle("Optional text field")
    subheader: string = "Subheader Text";

    @title("CTA Text")
    ctaText: string = "Call To Action";

    @title("CTA Destination URL")
    @subtitle("Requires full URL string including https://")
    ctaUrl: string = "https://www.northerntrailoutfitters.com";

    run(context: CampaignComponentContext) {
        return {};
    }

}

