'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/libs/api';
import DaisyButton from '@/components/DaisyButton';
import { GroceryListModal, GroceryListModalContents, GroceryListModalDismissButton, GroceryListModalOpenButton } from '@/components/GroceryListModal';
import { AddGroceryListModal, AddGroceryListModalContents, AddGroceryListModalOpenButton } from '@/components/AddGroceryListModal';
import AddGroceryListForm from './add-grocery-list-form';

/**
 * Holds button and modal elements for displaying the Add grocery list modal
 */
function NewGroceryList({ className }) {
    return (
        <div className={`${className}`}>
            <AddGroceryListModal>
                <AddGroceryListModalOpenButton>
                    <DaisyButton
                        label="New Grocery List"
                        type="button"
                    />
                </AddGroceryListModalOpenButton>
                <AddGroceryListModalContents>
                    <AddGroceryListForm />
                </AddGroceryListModalContents>
            </AddGroceryListModal>
        </div>
    );
}

/**
 * Retrieves and displays grocery lists
 * - Also controls when the edit form displays
 * TODO: This component is (probably) doing too much. See about breaking it 
 *          up into multiple components.
 * @param {*} param0 
 * @returns 
 */
function GroceryListDisplay({ className }) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [groceryLists, setGroceryLists] = useState([]);

    const getGroceryLists = async () => {
        const data = await apiClient.post("/grocery-lists")
            .then(function (res) {
                console.log(`CLIENT - res in request: ${res}`)
                return res
            });
        return data;
    }

    useEffect(() => {
        (async () => {
            let data = await getGroceryLists();
            console.log(`CLIENT - data in useEffect: ${data}`);
            setGroceryLists(data);
        })();
    }, []);

    return (
        <div className={`flex flex-col justify-center items-center ${className}`}>
            <ul>
                {groceryLists && groceryLists.length > 0 ? groceryLists.map((list, index) => {
                    return (
                        <GroceryListModal key={index}>
                            <GroceryListModalOpenButton>
                                <li key={index}
                                    className="my-2 cursor-pointer"
                                >
                                    <div>{list.dateCreated}</div>
                                    <div>{list.groceryItems.length} items</div>
                                </li>
                            </GroceryListModalOpenButton>
                            <GroceryListModalContents>
                                <div>
                                    <div className="flex flex-row justify-between">
                                        <div className="font-medium text-slate-800">Grocery List: {list.dateCreated}</div>
                                        <DaisyButton label="Edit" type="button" onClick={() => setShowEditForm(!showEditForm)} />
                                    </div>
                                    {showEditForm ? (
                                        <form>
                                            <p>Edit form goes here</p>
                                        </form>
                                    ) : (
                                        <>
                                            <ul>
                                                {list.groceryItems && list.groceryItems.length > 0 ? list.groceryItems.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <span>{item && item.quantity ? item.quantity : ''} {item && item.name ? item.name : ''}</span>
                                                        </li>
                                                    )
                                                }) : 'Add items to your grocery list'}
                                            </ul>
                                            <div>Related recipes &gt;&gt;</div>
                                        </>
                                    )}
                                </div>
                                <GroceryListModalDismissButton>
                                    <DaisyButton
                                        label="Dismiss"
                                        type="button"
                                        className="mt-12"
                                    />
                                </GroceryListModalDismissButton>
                            </GroceryListModalContents>
                        </GroceryListModal>
                    )
                }) : ''}
            </ul>
        </div>
    );
}

/**
 * Maintains structural ordering, styling for grocery lists
 * ...totally not sugar syntax for managing this "page's" layout
 */
export default function GroceryLists() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2>Grocery Lists</h2>
            <div className="flex flex-row items-center min-w-[75%]">
                <GroceryListDisplay className="grow" />
                <NewGroceryList className="justify-self-end" />
            </div>
        </div>
    );
}