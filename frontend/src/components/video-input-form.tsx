import { FileVideo, Upload } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useMemo, useState } from "react";

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-6">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0" />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Upload video
          </>
        )}
      </label>
      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcript Prompt</Label>
        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Add kew words mentioned on video separated by commas (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        Upload Video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}