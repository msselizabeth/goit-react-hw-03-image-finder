import { Component } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContainer } from "./Modal.styled";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

   componentDidMount() {
        window.addEventListener('keydown', this.onKeyClose)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyClose)
    };

    onKeyClose = (e) => e.code === 'Escape' && this.props.onClose();

    onCloseBackdrop = (evt) => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <Backdrop onClick={this.onCloseBackdrop}>
                <ModalContainer>{this.props.children}</ModalContainer>
            </Backdrop> , modalRoot
        )
    }

}

Modal.propTypes = {
    children: PropTypes.object,
};