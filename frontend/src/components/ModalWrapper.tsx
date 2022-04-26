import React from "react";
import {Modal} from "@mui/material";

const ModalWrapper = ({children ,onClose}: {children: React.ReactElement,onClose: (() => void)}) => {
    return (
        <Modal open onClose={onClose}>
            {children}
        </Modal>
    );
}

export default ModalWrapper;