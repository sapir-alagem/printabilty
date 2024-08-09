import React from "react";


const NewCompany = () => {
    const createCompany = async event => {
        // event.prevntDefault();

        try {
            const response = await fetch('http://localhost:5000/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'appliction/json',
                },
                body: JSON.stringify({
                    name: 'YAY!',
                })
            });

            const resposeData = await response.json();
            console.log(resposeData);

        } catch (error) {
            console.log(error);
        };

    }

    return (
        <div>
            <h2>New Company Signup</h2>
            <button onClick={createCompany}>Create Company</button>
        </div>
    );
};

export default NewCompany;