import React from 'react';
import ImageUploader from 'react-images-upload';
import firebase, {storageRef} from './firebaseconfig';


class fileUpload extends React.Component {

    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {

        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

        // Create the file metadata
        var metadata = {
          contentType: 'image/jpg'
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + picture[0].name).put(picture[0], metadata);

        uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("downloadURL "+"\n"+ downloadURL);
      });

    }

    downloadImg() {

        storageRef.child('images/cat.jpg').getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var file = xhr.response;
          console.log('downloaded file ', file);
        };
        xhr.open('GET', url);
        xhr.send();


        console.log('downloaded url ', url);

      }).catch(function(error) {
        // Handle any errors
      });
    }

    deleteImg() {

      // Delete the file
      storageRef.child('images/logoblue.jpg').delete().then(function() {
      // File deleted successfully
      }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log(error);

      });
    }

    render() {
        return (
          <div>
            <div>
              <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              />
            </div>
            <div>
                <button onClick={this.downloadImg.bind(this)}>Download</button>
            </div>
            <div>
                <button onClick={this.deleteImg.bind(this)} className="button">Delete</button>
            </div>
        </div>
        );
    }
}

export default fileUpload;
