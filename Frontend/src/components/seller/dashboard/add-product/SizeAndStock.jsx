// import React from "react";

// const SizeAndStock = ({ label, id, isChecked, showStock, handleSizeClick }) => {
//   const styles = {
//     style1: {
//       height: "50%",
//     },
//     style2: {
//       height: "100%",
//     },
//     style3: {
//       height: "0%",
//     },
//   };
//   return (
//     <div className="border-2 border-black  min-w-[80px] h-full  relative mx-1">
//       <label
//         style={isChecked ? styles.style1 : styles.style2}
//         className={`duration-300 flex justify-center items-center  bg-gray-300 w-full `}
//         htmlFor={id}
//       >
//         {label}
//       </label>
//       <input
//         className="absolute opacity-0 border-2"
//         type="checkbox"
//         id={id}
//         onClick={(e) => handleSizeClick(e)}
//       />
//       {showStock && (
//         <input
//           style={isChecked ? styles.style1 : styles.style3}
//           className={`duration-300 w-full p-2 absolute bottom-0`}
//           type="number"
//           placeholder="Stock"
//           id={`${id}-stock`}
//           onInput={(e) => {
//             e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numeric values
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SizeAndStock;
import React from "react";

const SizeAndStock = ({ label, id, isChecked, showStock, handleSizeClick }) => {
  const styles = {
    style1: {
      height: "50%",
    },
    style2: {
      height: "100%",
    },
    style3: {
      height: "0%",
    },
  };

  return (
    <div className="border-2 border-black  min-w-[80px] h-full  relative mx-1">
      <label
        style={isChecked ? styles.style1 : styles.style2}
        className={`duration-300 flex justify-center items-center  bg-gray-300 w-full `}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="absolute opacity-0 border-2"
        type="checkbox"
        id={id}
        onClick={handleSizeClick}
      />
      {showStock && (
        <input
          style={isChecked ? styles.style1 : styles.style3}
          className={`duration-300 w-full p-2 absolute bottom-0`}
          type="number"
          placeholder="Stock"
          id={`${id}-stock`}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric values
          }}
        />
      )}
    </div>
  );
};

export default SizeAndStock;
