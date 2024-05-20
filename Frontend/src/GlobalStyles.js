// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
.overrite {
    display: flex;
}

*{
  font-family: "Comfortaa", sans-serif;
  font-style: italic;
}




  .hoverButton{
    height: 50px;
    padding: 0 0.75rem;
    background-color: black;
    color: #d9a470;
    font-family: 'Dancing Script', cursive;
    border: #d9a470 solid 1px; 
    border-radius: 100px;
    transition-duration: 300ms;
  }
  .hoverButton:hover{
    background-color: #d9a470;
    color:black;
    border-color: black;
  }
  p {
    /* font-size: 15px; */
    font-size: clamp(11px, 2vw, 17px);
  }

  .cursive {
    font-family: 'Dancing Script', cursive;
  }

  .h1 {
    font-family: "Barlow", sans-serif;
    font-size: clamp(35px, 4vw, 100px);
  }
  .main {
    background-color: black;
    /* color: #d9a470; */
    /* color: pink; */
    width: 100vw;
    min-height: 87vh;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
  /* Change to flex column layout for screen sizes less than medium (768px) */
  .main2 {
    flex-direction: column;
  }
}
  .opensans {
    font-family: "Open Sans", sans-serif;
  }
  /* input{
    font-family: "Dancing Script", cursive;
  } */
  input:focus, textarea:focus {
    outline: none;
  }
  .glass {
    background: rgba(245, 243, 243, 0.12);
    border-radius: 3px;
    backdrop-filter: blur(5.8px);
    -webkit-backdrop-filter: blur(5.8px);
    border: 1px solid rgba(245, 243, 243, 0.22);
  }
  .glass-input {
    background: #c5a8711c;
    border-radius: 3px;
    backdrop-filter: blur(5.8px);
    -webkit-backdrop-filter: blur(5.8px);
    /* border: 1px solid rgba(245, 243, 243, 0.22); */
  }
  .bg-light{
    background-color: #FCD7B2;
  }

  @media only screen and (min-width: 768px) {

    .auto-collapse {
      left: -70%;
    }

}

`;

export default GlobalStyle;