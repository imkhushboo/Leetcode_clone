import { useState } from "react";

// const [props, setprops] = useState({
//     'token': null,
// });

//BLOGS

export const fetchBlog = () => {
    return async (dispatch) => {

        try {
            const response = await fetch('http://localhost:3001/blog', {
                method: 'GET'
            })

            const json = await response.json();

            if (response.status !== 200) {
                const error = "there is error!!";
                throw error;
            }
            dispatch({
                type: 'fetchblogsuccessful',
                payload: json
            })

        } catch (err) {
            dispatch({
                type: 'fetchblogfail'
            });
        }

    }
}

export const rendermodal = (props) => {
    return (dispatch) => {
        dispatch({
            type: 'rendermodal',
            payload: props
        });
    }
}

export const addblog = (props) => {
    console.log(props);
    return async (dispatch) => {

        try {
            const temp = { blogid: null, blogdetail: { title: props.title, description: props.description, time: props.time } };

            if (!localStorage.getItem('token')) {
                const err = 'trying to sign in first';
                throw err;
            }
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/blog/add', {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(temp)
            })

            if (response.status != 200) {
                const error = 'some error occured!';
                throw error;
            }
            console.log(response.status);
            dispatch({
                type: 'addblogsuccessful'
            })
        }
        catch (err) {
            dispatch({
                type: 'addblogfail'
            })
        }

    }
}

export const deleteblog = (blogid) => {
    return async (dispatch) => {
        try {
            let temp = confirm('Do you want to delete the Blog ?');
            if (!temp) {
                return;
            }
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/blog/delete/:${blogid}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const json = await response.json();

            if (response.status !== 200) {
                const err = json.msg;
                throw err;

            }

            dispatch({
                type: 'deleteblogsuccessful',
            })

        } catch (err) {
            dispatch({
                type: 'deleteblogfail',
            })
        }
    }
}


//update props

export const updateprofileReducer = (props) => {
    console.log(props);
    return (dispatch) => {
        dispatch({
            type: 'update profile',
            payload: props
        })
    }
}



//auth user

export const signupUser = ({ email, password }) => {

    return async (dispatch) => {
        try {
            console.log(email, password);

            const response = await fetch("http://localhost:3001/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email, password
                })
            });


            const json = await response.json();

            if (response.status != 200) {
                const err = json.msg;
                throw err;
            }
            dispatch({
                type: 'signupusersuccess',
                payload: { email, password },
            })


        }
        catch (err) {
            dispatch({
                type: 'signupuserfail'
            })
        }

    }


}


export const LogIn = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email, password
                })
            });


            const json = await response.json();

            if (response.status != 200) {
                const err = json.msg;
                throw err;
            }
            console.log(json.token);
            localStorage.setItem('token', json.token);
            dispatch({
                type: 'loginsuccess',
                payload: { email, password, token: json.token }
            })

        } catch (err) {
            console.log(err);
            dispatch({
                type: 'loginfailed',
            })
        }
    }
}


export const LogOut = () => {
    return (dispatch) => {
        try {

            localStorage.removeItem('token');
            dispatch({
                type: 'logoutsuccess'
            })
        } catch (err) {
            dispatch({
                type: 'logoutfailed'
            })
        }

    }
}