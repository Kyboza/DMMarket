import { createStore, action, thunk } from "easy-peasy";
import postsAPIprac from "./postsAPIprac";

const storeModel = {
    postFunction:{

        posts: [],
        setPosts: action((state, payload) => {
          state.posts = payload;
          localStorage.setItem('posts', JSON.stringify(state.posts))
        }),
  
        postName: '',
        setPostName: action((state, payload) => {
          state.postName = payload;
        }),
  
        postPhone: '',
        setPostPhone: action((state, payload) => {
          state.postPhone = payload;
        }),
  
        postAddress: '',
        setPostAddress: action((state, payload) => {
          state.postAddress = payload;
        }),
  
        postCode: '',
        setPostCode: action((state, payload) => {
          state.postCode = payload;
        }),
  
        postBody: '',
        setPostBody: action((state, payload) => {
          state.postBody = payload;
        }),
  
       addPost: thunk(async(actions, newPost, helpers) => {
        const {posts} = helpers.getState()
        try{
          const response = await postsAPIprac.post('/posts', newPost)
          actions.setPosts([...posts, response.data])
        }
        catch(error){
          console.log('Cant send post to the server', error)
        }
       })
    },

    cartTest: {
      formDataTest: {
        fullName: '',
        phone: '',
        email: '',
        country: '',
        adress: '',
        postalNumber: ''
      },

      setFormDataTest: action((state, payload) => {
        state.formDataTest = payload;
        localStorage.setItem('formDataTest', JSON.stringify(state.formDataTest))
      }),

      clearFormDataTest: action((state) =>{
        state.formDataTest = {
          fullName: '',
          phone: '',
          email: '',
          country: '',
          adress: '',
          postalNumber: ''
        },
        localStorage.removeItem('formDataTest')
      }),

      checkoutCartTest: thunk(async(cartItems) => {
        try{
          if(!cartItems || cartItems.length === 0){
            throw new Error('Wrong with cart items')
          }
          const response = await postsAPI.post('/checkout-cart-test', {cartItems})
            if(response.data?.url){
              return {url: response.data.url}
            }
            else{
              throw new Error('Problematica')
            }
        }
        catch(error){
          console.log(error)
          throw error;
        }
      })

      
    }
}
const store = createStore(storeModel)
export default store;