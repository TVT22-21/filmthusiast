import "./App.css";
import { useState } from 'react';

export default function Settings(){

    const options= [
        {
            header:{
                name: "Käyttäjäasetukset",
            },
            values:[
            {
                name: "Vaihda käyttäjänimi",
                description: "Vaihda tästä käyttäjänimesi",
                tags: ["username"],
            },
            {
                name: "Vaihda salasana",
                description: "Vaihda tästä salasanasi",
                tags: ["password"],
            },
            {
                name: "Vaihda sähköposti",
                description: "Vaihda tästä sähköpostisi",
                tags: ["email"],
            },
                

            ],
        },

        {
            header:{
                name: "Sovellusasetukset",
            },

            values: [

            ],
        },
    ]
    const [visibleOptions,setVisibleOptions] =useState(options);

    const onChange=(e)=>{
        e.preventDefault();
        const value=e.target.value;

        console.log("value", value);

        if(value.trim().length === 0){
            setVisibleOptions(options);
            return;
        }

        const returnedItems=[];

        visibleOptions.forEach((option,index) =>{
            const foundOptions=option.values.filter(item=>{
                return (item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
                || item.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1)
            });

            returnedItems[index]={
                header:{
                    name:option.header.name,
                },
                values:foundOptions,
            };
        });
/*
        if(options.header.name
            .toLocaleLowerCase()
            .search(value.trim().toLowerCase()) !== -1
        ){
            returnedItems[index]={
                header:{
                    name:options.header.name,
                },
                values:options[index].values,
            };

        }
*/
        setVisibleOptions(returnedItems);
    };

    return(
        <div className="Settings">
            <div className="container mt-5">
                <h1>
                    <span>
                        <button className="btn btn-secondary">
                            {" "}
                            <span>&lt;</span> Back{" "}
                        </button>
                        Settings
                    </span>
                </h1>

                <input type="text"
                 className="form-control mt-5"
                 onChange={onChange}
                 placeholder="Search..."/>

                <div>
                    {visibleOptions.map(option =>
                        <div key={option.header.name} className="mt-5 mt-2">
                        <h3>{option.header.name}</h3>

                        <div>
                            {option.values.map((value) => 
                            (<div key={value.name}>
                                <ul className="list-group">
                                    <li className="list-group-item mb-2">
                                        <h6 className="font-weight-bold">{value.name}</h6>
                                        <h6>{value.description}</h6>
                                    </li>
                                </ul>
                            </div>))}
                        </div>

                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}