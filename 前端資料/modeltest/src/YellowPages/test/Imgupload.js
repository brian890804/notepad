import React from 'react'
import AvatarEditor from 'react-avatar-editor'

class Imgupload extends React.Component {
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()
    }
  }

  setEditorRef = (editor) => (this.editor = editor)

  render() {
    return (
      <AvatarEditor
        ref={this.setEditorRef}
        image="data:image/jpeg;base64,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"
        width={250}
        height={250}
        border={50}
        scale={1.2}
      />
    )
  }
}

export default Imgupload