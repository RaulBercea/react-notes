import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import Container from "react-bootstrap/esm/Container";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  // Notes and tags storage
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // get the notes and their assosciated ids
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  // function that handles the creation of a note
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        {/* Home */}
        <Route path="/" element={<h1>Home</h1>} />

        {/* New Note */}
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />

        {/*  */}
        <Route path="/:id">
          {/*  */}
          <Route index element={<h1>Show</h1>} />
          {/*  */}
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>

        {/* Wildcard Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
