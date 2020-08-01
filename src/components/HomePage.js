import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";

import {
    Menu,
    Segment,
    Header,
    Button,
    Grid,
    Modal,
    Image,
    Dropdown,
    Icon,
    Form
} from "semantic-ui-react";
import "./HomePage.css";


const Title = {
    color: "black",
    backgroundImage: "url(https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105__340.png)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "10px",
    fontFamily: "Arial",
    fontSize: "4rem",
    textShadow: "0px 0px 10px rgb(11, 8, 185)",
};

const DropdownExampleSelection = () => ( <
    Dropdown placeholder = "Select user"
    search multiple selection options = { userOptions }
    />
);



const options = [{
        key: 3,
        text: "3",
        value: 3,
    },
    {
        key: 4,
        text: "4",
        value: 4,
    },
    {
        key: 5,
        text: "5",
        value: 5,
    },
    {
        key: 6,
        text: "6",
        value: 6,
    },
    {
        key: 7,
        text: "7",
        value: 7,
    },
    {
        key: 8,
        text: "8",
        value: 8,
    },
];

class DropdownExampleControlled extends Component {
    state = {};

    handleChange = (e, { value }) =>
        this.setState({
            value,
        });

    render() {
        const { value } = this.state;

        return ( <
            Grid columns = { 2 } >
            <
            Grid.Column >
            <
            Dropdown onChange = { this.handleChange }
            options = { options }
            placeholder = "Select Size of Board"
            selection value = { value }
            />{" "} < /
            Grid.Column > { " " } <
            /Grid>
        );
    }
}
const userOptions = [{
        key: "Jenny Hess",
        text: "Jenny Hess",
        value: "Jenny Hess",
        image: {
            avatar: true,
            src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
        },
    },
    {
        key: "Elliot Fu",
        text: "Elliot Fu",
        value: "Elliot Fu",
        image: {
            avatar: true,
            src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
        },
    },
    {
        key: "Stevie Feliciano",
        text: "Stevie Feliciano",
        value: "Stevie Feliciano",
        image: {
            avatar: true,
            src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
        },
    },
    {
        key: "Christian",
        text: "Christian",
        value: "Christian",
        image: {
            avatar: true,
            src: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
        },
    },
];

class MenuExampleInvertedSecondary extends Component {
    state = {
        activeItem: "home",
    };

    handleItemClick = (e, { name }) =>
        this.setState({
            activeItem: name,
        });

    render() {
        const { activeItem } = this.state;

        return ( <
            Segment inverted >
            <
            Menu inverted pointing secondary >
            <
            Menu.Item name = "HOME"
            active = { activeItem === "home" }
            onClick = { this.handleItemClick }
            />{" "} <
            Menu.Item name = "GAME BOARD"
            active = { activeItem === "game" }
            onClick = { this.handleItemClick }
            />{" "} <
            Menu.Item name = "LEADER BOARD"
            active = { activeItem === "leaderboard" }
            onClick = { this.handleItemClick }
            />{" "} < /
            Menu > { " " } <
            /Segment>
        );
    }
}

class ButtonExampleFocus extends Component {
    render() {
        return ( <
            Grid >
            <
            Grid.Column width = { 8 } >
            <
            Button content = "START GAME"
            primary ref = { this.buttonRef }
            />{" "} < /
            Grid.Column > { " " } <
            /Grid>
        );
    }
}

class ModalExampleControlled extends Component {
    state = {
        modalOpen: false,
    };

    handleOpen = () =>
        this.setState({
            modalOpen: true,
        });

    handleClose = () =>
        this.setState({
            modalOpen: false,
        });

    render() {
        return ( <
            Modal trigger = { < Button onClick = { this.handleOpen } > INSTRUCTIONS < /Button>}
                open = { this.state.modalOpen }
                onClose = { this.handleClose }
                basic
                size = "small" >
                <
                Header icon = "info"
                content = "HOW TO PLAY!" / >
                <
                Modal.Content >
                <
                h3 > { "THIS MODAL SHOWS GAME INSTRUCTIONS! " } < /h3>{" "} < /
                Modal.Content > { " " } <
                Modal.Actions >
                <
                Button color = "green"
                onClick = { this.handleClose }
                inverted >
                <
                Icon name = "checkmark" / > Got it { " " } <
                /Button>{" "} < /
                Modal.Actions > { " " } <
                /Modal>
            );
        }
    }

    function ModalExampleContentImage() {
        const [open, setOpen] = React.useState(false);

        return ( <
            Modal onClose = {
                () => setOpen(false)
            }
            onOpen = {
                () => setOpen(true)
            }
            open = { open }
            trigger = { < Button secondary > ADD USER < /Button>} > { " " } <
                Modal.Header > ADD USERS < /Modal.Header>{" "} <
                Modal.Content image >
                <
                Image
                size = "medium"
                src = "https://react.semantic-ui.com/images/avatar/large/rachel.png"
                wrapped /
                >
                <
                Modal.Description >
                <
                p > SELECT YOUR CHARACTER < /p>{" "} < /
                Modal.Description > { " " } { " " } <
                /Modal.Content>{" "} <
                Modal.Actions >
                <
                Button onClick = {
                    () => setOpen(false)
                } > Cancel < /Button>{" "} <
                Button onClick = {
                    () => setOpen(false)
                }
                positive >
                ADD USER { " " } <
                /Button>{" "} < /
                Modal.Actions > { " " } <
                /Modal>
            );
        }

        class HomePage extends Component {
            state = {};
            render() {
                return ( <
                    div >
                    <
                    div className = "title" > { " " } <
                    Header as = "h1"
                    block style = { Title } >
                    TIC - TAC - TOE { " " } <
                    /Header>{" "} < /
                    div > { " " } <
                    div > { " " } <
                    MenuExampleInvertedSecondary / > { " " } <
                    /div>{" "} <
                    div className = "adduser" >
                    <
                    ModalExampleContentImage / > { " " } <
                    span >
                    <
                    DropdownExampleSelection / > { " " } <
                    /span>{" "} < /
                    div > { " " } <
                    div className = "selectboard" > { " " } <
                    DropdownExampleControlled / > { " " } <
                    /div>{" "} <
                    div className = "btn" >
                    <
                    ButtonExampleFocus / > { " " } <
                    /div>{" "} <
                    div className = "instruction" >
                    <
                    ModalExampleControlled / > { " " } <
                    /div>{" "} < /
                    div >
                );
            }
        }

        export default HomePage;