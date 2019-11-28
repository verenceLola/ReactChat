
import { createApp } from "frint";
import Default from "../components/default";

export default createApp({
    name: 'ReactApp',
    providers: [
        {
            name: 'component',
            useValue: Default
        }
    ]
});
