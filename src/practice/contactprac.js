/*import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Contact = () => {
  // Retrieve state from the store
  const postName = useStoreState((state) => state.postFunction.postName);
  const postPhone = useStoreState((state) => state.postFunction.postPhone);
  const postAddress = useStoreState((state) => state.postFunction.postAddress);
  const postCode = useStoreState((state) => state.postFunction.postCode);
  const postBody = useStoreState((state) => state.postFunction.postBody);

  // Retrieve actions from the store
  const addPost = useStoreActions((actions) => actions.postFunction.addPost); // Use addPost
  const setPostName = useStoreActions((actions) => actions.postFunction.setPostName);
  const setPostPhone = useStoreActions((actions) => actions.postFunction.setPostPhone);
  const setPostAddress = useStoreActions((actions) => actions.postFunction.setPostAddress);
  const setPostCode = useStoreActions((actions) => actions.postFunction.setPostCode);
  const setPostBody = useStoreActions((actions) => actions.postFunction.setPostBody);

  const navigate = useNavigate();

  // Submit post function
  const submitPost = async (e) => {
    e.preventDefault(); 
    const date = format(new Date(), 'yyyy MM dd'); 
    const newPost = {
      name: postName,
      phone: postPhone,
      address: postAddress, 
      code: postCode,
      body: postBody,
      dateTime: date,
    };

    try {
      await addPost(newPost); 
      console.log(newPost); 
      setPostName('');
      setPostPhone('');
      setPostAddress('');
      setPostCode('');
      setPostBody('');
      navigate('/'); 
    } catch (error) {
      console.log('Could not submit post', error);
    }
  };

  // Handle postcode change with validation
  const handlePostCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{5}$/.test(value)) {
      setPostCode(value);
    } else {
      alert('Please enter a valid postcode');
    }
  };

  return (
    <main className='Main__container'>
      <p className='Contact__title'>Contact Form</p>
      <form action="#" className='Contact__form_container' onSubmit={submitPost}>
        <div className='Contact__singular_container'>
          <label htmlFor='name' className='offscreen'>Contact Form Name</label>
          <p className='Contact__sub_title'>Name:</p>
          <input 
            type="text"
            id='name'
            placeholder='Enter Name'
            className='Contact__singular_input'
            required
            autoComplete='off'
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className='Contact__singular_container'>
          <label htmlFor='phone' className='offscreen'>Contact Form Phone</label>
          <p className='Contact__sub_title'>Phone:</p>
          <input 
            type="tel"
            id='phone'
            placeholder='Enter Phone'
            className='Contact__singular_input'
            required
            autoComplete='off'
            value={postPhone}
            onChange={(e) => setPostPhone(e.target.value)}
          />
        </div>

        <div className='Contact__singular_container'>
          <label htmlFor='address' className='offscreen'>Contact Form Address</label>
          <p className='Contact__sub_title'>Address:</p>
          <input 
            type="text"
            id='address'
            placeholder='Enter Address'
            className='Contact__singular_input'
            required
            autoComplete='off'
            value={postAddress}
            onChange={(e) => setPostAddress(e.target.value)}
            maxLength={15}
          />
        </div>

        <div className='Contact__singular_container'>
          <label htmlFor='postal' className='offscreen'>Contact Form Postal</label>
          <p className='Contact__sub_title'>Post:</p>
          <input 
            type="text"
            id='postal'
            placeholder='Enter Postcode'
            className='Contact__singular_input'
            required
            autoComplete='off'
            value={postCode}
            onChange={handlePostCodeChange}
          />
        </div>

        <div className='Contact__textarea_container'>
          <label htmlFor='message' className='offscreen'>Contact Form Message</label>
          <p className='Contact__sub_title'>Message:</p>
          <textarea
            type="text"
            id='message'
            placeholder='Enter Message'
            className='Contact__textarea_input'
            required
            autoComplete='off'
            maxLength={150}
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>

        <div className='Contact__button_container'>
          <button className='Contact__button' type='submit'>
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default Contact;*/
