import { constant } from '../constant.jsx';
const baseURL = process.env.REACT_APP_PORT || "https://keetcode.onrender.com"

console.log(baseURL);



//BLOGS

export const fetchBlog = () => {
    return async (dispatch) => {


        try {

            const response = await fetch(`${baseURL}/blog`, {
                method: 'GET'
            })

            const json = await response.json();

            if (response.status !== 200) {
                const error = "there is error!!";
                throw error;
            }
            dispatch({
                type: constant.FETCH_BLOG_SUCCESSFUL,
                payload: json
            })

        } catch (err) {
            dispatch({
                type: constant.FETCH_BLOG_FAILED
            });
        }

    }
}



export const addblog = (props) => {
    console.log("propss", props);
    return async (dispatch) => {

        try {

            const temp = { blogid: props.blogid, blogdetail: { title: props.title, description: props.description, time: props.time } };

            if (!localStorage.getItem('token')) {
                const err = 'trying to sign in first';
                throw err;
            }
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseURL}/blog/add`, {
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
                type: constant.ADD_BLOG_SUCCESSFUL
            })
        }
        catch (err) {
            dispatch({
                type: constant.ADD_BLOG_FAILED
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
            const response = await fetch(`${baseURL}/blog/delete/:${blogid}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const json = await response.json();
            console.log(json);

            if (response.status !== 200) {
                const err = json.msg;
                throw err;

            }

            dispatch({
                type: constant.DELETE_BLOG_SUCCESSFUL
            })



        } catch (err) {
            dispatch({
                type: constant.DELETE_BLOG_FAILED,
            })
        }
    }
}




//auth user

export const signupUser = ({ email, password }) => {
    console.log(email, password);

    return async (dispatch) => {
        try {
            dispatch({
                type: 'loading'
            })

            const response = await fetch(`${baseURL}/signup`, {
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
                type: constant.SIGNUP_SUCCESSFUL,
                payload: { email, password },
            })


        }
        catch (err) {
            console.log(err);
            dispatch({
                type: constant.SIGNUP_FAILED,
                payload: err
            })
        }

    }


}


export const LogIn = ({ email, password }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'loading'
            })
            const response = await fetch(`${baseURL}/login`, {
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
                type: constant.LOGIN_SUCCESSFUL,
                payload: { email, password, token: json.token }
            })

        } catch (err) {
            console.log(err);
            dispatch({
                type: constant.LOGIN_FAILED,
            })
        }
    }
}


export const LogOut = () => {
    return (dispatch) => {
        try {
            dispatch({
                type: 'loading'
            })

            localStorage.removeItem('token');
            dispatch({
                type: constant.LOGOUT_SUCCESSFUL
            })
        } catch (err) {
            dispatch({
                type: constant.LOGOUT_FAILED
            })
        }

    }
}


export const fetchproblems = (pageno) => {
    console.log(pageno);
    return async (dispatch) => {
        try {

            const response = await fetch(`${baseURL}/problemSet/all/:${pageno}`, {
                method: 'POST',
            })

            const json = await response.json();
            // console.log(json);

            if (response.status != 200) {
                const err = json.msg;
                throw err;
            }

            dispatch({
                type: constant.FETCH_PROBLEM_SUCCESSFUL,
                payload: json
            })
        } catch (err) {
            dispatch({
                type: constant.FETCH_PROBLEM_FAILED,
                payload: err
            })
        }

    }


}

export const fetchselectedproblem = (problem_id) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`${baseURL}/problem/:${problem_id}`, {
                method: 'GET',

            })

            const json = await response.json();

            if (response.status != 200) {
                const err = json.msg;
                throw err;
            }
            console.log(json.problem);

            dispatch({
                type: constant.FETCH_SELECTED_PROBLEM_SUCCESSFUL,
                payload: json.problem
            })



        } catch (err) {
            dispatch({
                type: constant.FETCH_SELECTED_PROBLEM_FAILED,
                payload: err
            })
        }

    }

}


export const submitProblemcode = ({ text, problem_id }) => {
    console.log(text, problem_id);

    return async (dispatch) => {
        try {
            console.log(text);
            const token = localStorage.getItem('token');
            if (token === null) {
                const err = 'First signed up !!';
                throw err;
            }
            const response = await fetch(`${baseURL}/submit/:${problem_id}`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    solution: text
                })

            })

            const json = await response.json();

            if (response.status != 200) {
                const err = 'some error occured!';
                throw err;
            }

            dispatch({
                type: constant.SUBMIT_PROBLEM_SUCCESSFUL,
                payload: json.Acceptance
            })

        } catch (err) {
            dispatch({
                type: constant.SUBMIT_PROBLEM_FAILED,
                payload: err
            })
        }

    }

}



export const submitcode = (problem_id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (token === null) {
                const err = 'Try to sign in first';
                throw err;
            }
            const response = await fetch(`${baseURL}/problems/:${problem_id}/submissions`, {
                method: 'GET',
                headers: { "Authorization": `Bearer ${token}` },
            })

            const json = await response.json();

            if (response.status != 200) {
                const err = 'some error occured!';
                throw err;
            }
            console.log(json);
            dispatch({
                type: constant.FETCH_SELECTED_SUBMISSION_SUCCESSFUL,
                payload: json.submissions
            })



        } catch (err) {
            dispatch({
                type: constant.FETCH_SELECTED_SUBMISSION_FAILED,
                payload: err
            })
        }

    }

}



export const fetchsubmission = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (token === null) {
                const err = 'Try to sign in first';
                throw err;
            }


            const response = await fetch(`${baseURL}/submissions`, {

                method: 'POST',
                headers: { "Authorization": `Bearer ${token}` },

            }
            )

            const json = await response.json();

            if (response.status != 200) {
                const err = 'Not able to fetch';
                throw err;
            }
            dispatch({
                type: constant.FETCH_SUBMISSION_SUCCESSFUL,
                payload: json
            })

        } catch (err) {
            dispatch({
                type: constant.FETCH_SUBMISSION_FAILED,
                payload: err
            })

        }

    }


}