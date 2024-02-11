import React from "react";
import AddExercise from "~/components/AddExercise";
import ProtectedRoute from "~/components/ProtectedRoute";

export default function addExercise() {
  return (
    <ProtectedRoute>
      <AddExercise />
    </ProtectedRoute>
  );
}
