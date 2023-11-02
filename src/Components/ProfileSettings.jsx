import React, { useEffect, useState } from "react";
import db, { auth, storage } from "../firebase";
import { Button } from "@material-tailwind/react";

function ProfileSettings(props) {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [imgFile, setImgFile] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        db.collection("users")
          .doc(props.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setUserData(doc.data());
            } else {
              console.log("No such document!");
            }
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [props.id]);
  if(userData === null) {
    return <p className="text-xl my-8 text-center font-bold">Loading...</p>
  }
  const deleteUser = () => {
    const userConfirmed=window.confirm("Are you sure you want to delete?");
    if(userConfirmed){
      db.collection("users")
      .doc(props.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        auth.signOut();
        auth.currentUser.delete().then(() => {
          console.log("User successfully deleted!");
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  };

  const handleEdit = () => {
    // Enable edit mode and populate editedUserData with the current data
    setEditMode(true);
    setEditedUserData(userData);
  };

  const handleSave = () => {
    // Create a storage reference for the user's profile picture
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`updateProfileImages/${props.id}`);

    // Check if a new image file has been selected
    if (imgFile) {
      // Upload the new image to Firebase Storage
      imageRef.put(imgFile).then((snapshot) => {
        // Get the download URL of the newly uploaded image
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Update the editedUserData with the new profile picture URL
          const updatedUserData = {
            ...editedUserData,
            profilePicture: downloadURL,
          };
          setEditedUserData(updatedUserData);
          setImgFile(null); // Reset the image file state

          // Create a Promise to ensure the download URL is obtained
          const downloadURLPromise = new Promise((resolve, reject) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
          });

          // Wait for the download URL Promise to resolve
          downloadURLPromise.then((downloadURL) => {
            // Update the user data in Firebase with the updatedUserData
            db.collection("users")
              .doc(props.id)
              .update(updatedUserData)
              .then(() => {
                console.log("Document successfully updated!");
                setUserData(updatedUserData); // Update the displayed data
                setEditMode(false); // Switch back to view mode
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          });
        });
      });
    } else {
      // If no new image file has been selected, update only the text data
      db.collection("users")
        .doc(props.id)
        .update(editedUserData)
        .then(() => {
          console.log("Document successfully updated!");
          setUserData(editedUserData); // Update the displayed data
          setEditMode(false); // Switch back to view mode
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div className="mx-2 my-2 bg-gray-900 p-4 md:p-8 lg:p-6 rounded">
      <div>
        {userData && !editMode && (
          <div className="flex flex-col gap-y-2 items-center sm:block">
            <div className="flex justify-between w-full p-1 sm:p-0">
             <div>
             <h1 className="text-2xl text-white sm:text-3xl">
                {" "}
                নমস্কার, {userData.firstName}
              </h1>
             </div>
             <div>
              <Button
              className="bg-pink-700 p-2 max-w-sm"
              onClick={handleEdit}
            >
              Edit
            </Button>
              </div>
            </div>
            <div className="flex flex-col gap-y-1 items-center justify-center text-center">
              <img
                className="rounded-full w-32 h-32"
                src={userData.profilePicture}
                alt={userData.firstName}
              />
              <h1 className="text-2xl text-white">
                Name: {userData.firstName} {userData.lastName}
              </h1>
              <h2 className="text-xl text-white">email: {userData.email}</h2>
              <h3 className="text-xl text-white">Gender: {userData.gender}</h3>
              <h3 className="text-xl text-white">
                District: {userData.district}
              </h3>
              <h3 className="text-xl text-white">
                Sub District: {userData.subdistrict}
              </h3>
              <h3 className="text-xl text-white">Course: {userData.course}</h3>
            </div>
            <div className="flex gap-2  w-full flex-row justify-between">
              <div>
              <Button
              className="p-2 max-w-sm bg-pink-700"
              onClick={deleteUser}
            >
              Delete My Account
            </Button>
              </div>
              <div onClick={() => {
              auth.signOut();
            }}>
              <Button className="p-2 max-w-sm bg-blue-700 rounded font-bold">
                Logout
              </Button>
             </div>
            </div>
          </div>
        )}

        {editMode && (
          <div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="flex gap-2 justify-center items-center flex-col">
                <img
                  className="rounded w-28 h-28 sm:rounded-full sm:w-32 sm:h-32"
                  src={
                    imgFile
                      ? URL.createObjectURL(imgFile)
                      : editedUserData.profilePicture
                  }
                  alt={editedUserData.firstName}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImgFile(e.target.files[0])}
                  className="bg-white rounded p-1 w-4/6 sm:w-5/6"
                />
              </div>
              <input
                type="text"
                name="firstName"
                value={editedUserData.firstName}
                className="p-1 rounded"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                className="p-1 rounded"
                placeholder="Last Name"
                value={editedUserData.lastName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="p-1 rounded"
                value={editedUserData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                className="p-1 rounded"
                value={editedUserData.gender}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                className="p-1 rounded"
                value={editedUserData.district}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="subdistrict"
                placeholder="Sub District"
                className="p-1 rounded"
                value={editedUserData.subdistrict}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="course"
                placeholder="Course"
                className="p-1 rounded"
                value={editedUserData.course}
                onChange={handleInputChange}
              />
            </div>
            <Button className="my-2 mx-2 px-1 bg-pink-700" onClick={handleSave}>
              Save Profile
            </Button>
            <Button
              className="my-2 mx-2 px-1 bg-green-700"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;