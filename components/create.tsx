import firebase from "firebase/app";
import { storage, db } from "@/lib/firebase";
import { useCallback, useRef } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    input,
    textarea {
      margin: 10px;
      width: 100%;
    }
    div {
      display: flex;
    }
  }
`;

const Create = () => {
  const titleRef = useRef(null);
  const onSaleRef = useRef(null);
  const salePriceRef = useRef(null);
  const priceRef = useRef(null);
  const categoryIDRef = useRef(null);
  const conditionRef = useRef(null);
  const descRef = useRef(null);
  const details1KeyRef = useRef(null);
  const details1ValueRef = useRef(null);
  const details2KeyRef = useRef(null);
  const details2ValueRef = useRef(null);
  const details3KeyRef = useRef(null);
  const details3ValueRef = useRef(null);
  const details4KeyRef = useRef(null);
  const details4ValueRef = useRef(null);
  const imagesRef = useRef(null);

  const groupNameRef = useRef(null);
  const groupImageRef = useRef(null);

  const onSubmitProductHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const product = {
        categoryID: categoryIDRef.current.value,
        condition: conditionRef.current.value
          ? [conditionRef.current.value]
          : [],
        description: descRef.current.value,
        details: [
          {
            key: details1KeyRef.current.value,
            value: details1ValueRef.current.value,
          },
          {
            key: details2KeyRef.current.value,
            value: details2ValueRef.current.value,
          },
          {
            key: details3KeyRef.current.value,
            value: details3ValueRef.current.value,
          },
          {
            key: details4KeyRef.current.value,
            value: details4ValueRef.current.value,
          },
        ],
        onsale: onSaleRef.current.checked,
        price: parseFloat(priceRef.current.value),
        purchases: 0,
        retailer: {
          id: "jacrc5cuWRhC4Dmtw2ZWExACTQd2",
          image: "/images/logo.png",
          name: "Stockary",
        },
        reviews: [
          {
            reviewer: "Nina",
            review: "Awesome products!",
            rating: 5,
          },
          {
            reviewer: "Shonette",
            review: "Good product.",
            rating: 5,
          },
          {
            reviewer: "Vida",
            review: "Great Purchase!",
            rating: 5,
          },
        ],
        salePrice: onSaleRef.current.checked
          ? parseFloat(salePriceRef.current.value)
          : null,
        title: titleRef.current.value.split(" "),
      };

      const productRef = await db.collection("products").doc();

      const imagesFiles = Array.from(imagesRef.current.files);

      const imagesLinks = [];
      let promise = new Promise(function (resolve, _) {
        imagesFiles.forEach(async (file) => {
          const link = await storage
            .ref("images")
            .child(
              `/products/${productRef.id}/${(file as { name: string }).name}`
            )
            .put(file)
            .then(async (snapshot) => {
              const link = await snapshot.ref.getDownloadURL();
              return link;
            });
          imagesLinks.push(link);
        });
        setTimeout(() => {
          resolve(imagesLinks);
        }, 10000);
      });

      promise
        .then(async (result) => {
          await productRef.set({
            ...product,
            images: result,
          });
        })
        .then(async () => {
          await db
            .collection("categories")
            .doc(categoryIDRef.current.value)
            .update({
              productsNumber: firebase.firestore.FieldValue.increment(1),
            });
        })
        .then(() => {
          console.log("DONE");
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    [
      titleRef,
      onSaleRef,
      salePriceRef,
      priceRef,
      categoryIDRef,
      conditionRef,
      descRef,
      details1KeyRef,
      details1ValueRef,
      details2KeyRef,
      details2ValueRef,
      details3KeyRef,
      details3ValueRef,
      details4KeyRef,
      details4ValueRef,
      imagesRef,
    ]
  );

  const onSubmitGroupHandler = useCallback(
    (e) => {
      e.preventDefault();
      const imageFile = groupImageRef.current.files[0];
      storage
        .ref("images")
        .child(`categories/${imageFile.name}`)
        .put(imageFile)
        .then(async (snapshot) => {
          return await snapshot.ref.getDownloadURL();
        })
        .then((res) => {
          db.collection("categories").add({
            name: groupNameRef.current.value,
            image: res,
            productsNumber: 0,
          });
        })
        .then(() => {
          console.log("DONE");
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    [groupNameRef, groupImageRef]
  );

  return (
    <div className="container">
      <FormContainer>
        <form onSubmit={onSubmitProductHandler}>
          <input type="text" placeholder="Title" ref={titleRef} />
          <label>On sale</label>
          <input type="checkbox" ref={onSaleRef} />
          <input type="text" placeholder="Sale price" ref={salePriceRef} />
          <input type="text" placeholder="Price" ref={priceRef} />
          <input type="text" placeholder="Category ID" ref={categoryIDRef} />
          <input type="text" placeholder="Condition" ref={conditionRef} />
          <textarea placeholder="Description" ref={descRef} />
          <div>
            <input type="text" placeholder="Details key" ref={details1KeyRef} />
            <input
              type="text"
              placeholder="Details value"
              ref={details1ValueRef}
            />
          </div>
          <div>
            <input type="text" placeholder="Details key" ref={details2KeyRef} />
            <input
              type="text"
              placeholder="Details value"
              ref={details2ValueRef}
            />
          </div>
          <div>
            <input type="text" placeholder="Details key" ref={details3KeyRef} />
            <input
              type="text"
              placeholder="Details value"
              ref={details3ValueRef}
            />
          </div>
          <div>
            <input type="text" placeholder="Details key" ref={details4KeyRef} />
            <input
              type="text"
              placeholder="Details value"
              ref={details4ValueRef}
            />
          </div>
          <input type="file" multiple ref={imagesRef} />
          <input type="submit" value="Create Product" />
        </form>
        {/* <form onSubmit={onSubmitGroupHandler}>
          <input type="text" placeholder="Name" ref={groupNameRef} />
          <input type="file" ref={groupImageRef} />
          <input type="submit" />
        </form> */}
      </FormContainer>
    </div>
  );
};

export default Create;
