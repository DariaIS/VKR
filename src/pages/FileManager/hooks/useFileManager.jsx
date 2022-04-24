import { useState } from 'react';

export const useFileManager = () => {
    const [parent, setParent] = useState('');
    const [isModalOpen, SetIsModalOpen] = useState(false);
    const [filesData, setFilesData] = useState({
        path: '',
        files: []
    });
    const [modalData, setModalData] = useState({
        file: '',
        modalType: '',
        isOpen: false
    });

    const getDirectory = (path) => {
        fetch('http://localhost:3001/filemanager?path=' + path)
        .then(res => res.json())
        .then(
            (result) => {
                let linkArr = result.path.split('/');
                linkArr.pop();
                setParent(linkArr.join('/'));
                console.log(result)
                setFilesData(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const clickDirectory = event => {
        event.preventDefault();
        getDirectory(event.target.attributes.href.value);
    }

    const effectDirectory = () => {
        fetch('http://localhost:3001/fileManager')
        .then(res => res.json())
        .then(
            (result) => {
                setFilesData(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getImage = (path, name) => {
        return (
            <div>
                <img src={'http://localhost:3001/getImage?path=' + path} width={150}/>
            </div>
        )
    }

    const clickRemove = (event, { path }) => {
        event.preventDefault();
        console.log('http://localhost:3001/removefile?path=' + event.target.attributes.href.value);
        fetch('http://localhost:3001/removefile?path=' + event.target.attributes.href.value)
        .then(res => res.json())
        .then(
            (result) => {
                effectDirectory();
                getDirectory(path);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const clickOpenModal = (event, { actionData }) => {
        event.preventDefault();
        SetIsModalOpen(true);
        setModalData(actionData);
    }

    const clickCloseModal = () => {
        SetIsModalOpen(false);
    }

    const handleUpload = (event, { path }) => {
        event.preventDefault();
        console.log(event.target[0].files.length);

        if (event.target[0].files[0]) {
            const formData = new FormData();
            const name = event.target[0].files[0].name;
            formData.append('file', event.target[0].files[0], event.target[0].files[0].name);
            console.log(event.target[0].files[0])
            fetch('http://localhost:3001/uploadfile?path=' + path, {
                method: "POST",
                body: formData
            
            })
            .then(res => res.json())
            .then(
                (result) => {
                    // window.location.reload();
                    getDirectory(path);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    const findTextNode = (node, text) => {
        if (text != '') {
            // clearTextNode(node);
            if (node.nodeType === 1) {
                let child = node.firstChild;
    
                while (child) {
                    let nextChild = child.nextSibling;
                    if (child.nodeType === 1 && child.tagName != 'SPAN' && child.className !== 'node-select')
                        findTextNode(child, text);
                    else if (child.nodeType === 3 && child.nodeValue.includes(text)) {
                        let newSpan = document.createElement('span');
                        newSpan.className = 'node-select';
                        newSpan.innerHTML = text;
                        let line = child.nodeValue.split(text);
                        line.forEach(element => {
                            child.before(element);
                            if (line.indexOf(element) !== line.length - 1)
                                child.before(newSpan.cloneNode(true));
                        });
                        node.removeChild(child);
                    }
                    child = nextChild;
                }
            }
        } 
    }

    const clearTextNode = (node) => {
        if (node.nodeType === 1) {
            let child = node.firstChild;
            console.log(node)
            while (child) {
                let nextChild = child.nextSibling;
                if (child.nodeType === 1) {
                    if (child.childNodes.length === 1 && child.childNodes[0]?.nodeType === 3) {
                        child.childNodes[0].innerHTML = child.childNodes[0]?.nodeType;
                        if (child.tagName === 'SPAN' && child.className === 'node-select') {
                            node.replaceChild(child.firstChild, child);
                        }
                    } else if (child.childNodes.length != 0)
                        clearTextNode(child);
                }
                child = nextChild;
            }
            let line = '';
            let isLine = true;
            node.childNodes.forEach(elem => {
                if (elem.nodeValue === null || elem.nodeType !== 3)
                    isLine = false;
                else {
                    line += elem.nodeValue;
                }
            })
            if (isLine) {
                node.innerHTML = line;
            }
        }
    }

    return {
        parent,
        filesData,
        modalData,
        effectDirectory,
        getDirectory,
        clickDirectory,
        getImage,
        clickRemove,
        isModalOpen,
        clickOpenModal,
        clickCloseModal,
        handleUpload,
        findTextNode,
        clearTextNode
    };
};
