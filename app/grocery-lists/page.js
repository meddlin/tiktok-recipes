'use client';

import { useState } from 'react';
import { GroceryListModal, GroceryListModalContents, GroceryListModalDismissButton, GroceryListModalOpenButton } from '@/components/GroceryListModal';

export default function GroceryLists() {
    const groceryLists = [
        {
            userId: '',
            dateCreated: '2024-09-27',
            groceryItems: [  // Grocery items break out
                {
                    name: 'eggs',
                    quantity: ''
                },
                {
                    name: 'bread',
                    quantity: ''
                },
                {
                    name: 'milk',
                    quantity: ''
                }
            ],
            relatedRecipes: [  // Array of IDs of the recipes associated with the grocery list
                'asdf1234', 'qwerty1234'
            ]
        },
        {
            userId: '',
            dateCreated: '2024-09-27',
            groceryItems: [  // Grocery items break out
                {
                    name: 'eggs',
                    quantity: ''
                },
                {
                    name: 'bread',
                    quantity: ''
                },
                {
                    name: 'milk',
                    quantity: ''
                }
            ],
            relatedRecipes: [  // Array of IDs of the recipes associated with the grocery list
                'asdf1234', 'qwerty1234'
            ]
        }
    ]

    // const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="">
            <h2>Grocery Lists</h2>

            <div className="flex flex-col justify-center items-center">
                <ul>
                    {groceryLists && groceryLists.length > 0 ? groceryLists.map((list, index) => {
                        return (
                            <GroceryListModal>
                                <GroceryListModalOpenButton>
                                    <li key={index}
                                        className="my-2 cursor-pointer"
                                    >
                                        <div>{list.dateCreated}</div>
                                        <div>{list.groceryItems.length} items</div>
                                    </li>
                                </GroceryListModalOpenButton>
                                <GroceryListModalContents>
                                    <h3>list: {index}</h3>
                                    <p>grocery list contents go here</p>
                                    <GroceryListModalDismissButton>
                                        <div>CLOSE</div>
                                    </GroceryListModalDismissButton>
                                </GroceryListModalContents>
                            </GroceryListModal>
                        )
                    }) : ''}
                </ul>
            </div>
        </div>
    );
}