import React, {useState, useEffect} from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarList from './SidebarList';

const SidebarContents = (props) => {

    const [todolists, setTodolists] = useState(props.todolists);

    useEffect(()=> {
        setTodolists(props.todolists)
    }, [props.todolists])

    useEffect(() => {

        var arrangedLists = [];
        props.todolists.forEach(item => {
            if (item.id == props.activeid) {
                arrangedLists.unshift(item)
            } else {
                arrangedLists.push(item)
            }
        })

        setTodolists(arrangedLists)
    }, [props.activeid])

    return (
        <>
            <SidebarHeader
                auth={props.auth} createNewList={props.createNewList}
                undo={props.undo} redo={props.redo}
            />
            <SidebarList
                activeid={props.activeid} handleSetActive={props.handleSetActive}
                todolists={todolists} createNewList={props.createNewList}
                updateListField={props.updateListField}
            />
        </>
    );
};

export default SidebarContents;