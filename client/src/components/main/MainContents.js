import React from 'react';
import TableHeader from './TableHeader';
import TableContents from './TableContents';

const MainContents = (props) => {

    const isSortedAscending = (list, attr) => {
        for (let j = 0; j < list.length - 1; j++) {
            if (list[j][attr] > list[j + 1][attr]) {
                return false;
            }
        }
        return true;
    }

    const handleSort = (attr) => {

        if (!props.activeList.items) {
            return;
        }

        let items = JSON.parse(JSON.stringify(props.activeList.items))
        let asc = isSortedAscending(items, attr);

        if (!asc) {
            props.sortItem(attr, items, 1);
        } else {
            props.sortItem(attr, items, -1);
        }
        

    }

    return (
        <div className='table ' >
            <TableHeader
                disabled={!props.activeList._id} addItem={props.addItem}
                setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                handleSort={handleSort}
                undo={props.undo} redo={props.redo}
            />
            <TableContents
                key={props.activeList.id} activeList={props.activeList}
                deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                editItem={props.editItem}
            />
        </div>
    );
};

export default MainContents;