import * as React from "react";
import { Provider, Flex, Header, Checkbox, Button } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the PlanetActionMessagingMessageExtensionConfig React component
 */
export interface IPlanetActionMessagingMessageExtensionConfigState extends ITeamsBaseComponentState {
    onOrOff: boolean;
}

/**
 * Properties for the PlanetActionMessagingMessageExtensionConfig React component
 */
export interface IPlanetActionMessagingMessageExtensionConfigProps {

}

/**
 * Implementation of the Planet Action Messaging configuration page
 */
export class PlanetActionMessagingMessageExtensionConfig extends TeamsBaseComponent<IPlanetActionMessagingMessageExtensionConfigProps, IPlanetActionMessagingMessageExtensionConfigState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            onOrOff: true
        });

        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
        microsoftTeams.appInitialization.notifySuccess();
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme} styles={{ height: "100vh", width: "100vw", padding: "1em" }}>
                <Flex fill={true}>
                    <Flex.Item>
                        <div>
                            <Header content="Planet Action Messaging configuration" />
                            <Checkbox
                                label="On or off?"
                                toggle
                                checked={this.state.onOrOff}
                                onChange={() => { this.setState({ onOrOff: !this.state.onOrOff }); }} />
                            <Button onClick={() =>
                                microsoftTeams.authentication.notifySuccess(JSON.stringify({
                                    setting: this.state.onOrOff
                                }))} primary>OK</Button>
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
