### **API Documentation: File Management System**

**Base URL:** `http://localhost:4000/api`

---

### **1. Data Transfer Object (DTO)**

**Type:** `FileDto`
This is the JSON structure used for sending file data to the server and receiving metadata back.

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| `fileName` | `string` | **Ignored in Input** | On upload, this is overwritten by the URL parameter to ensure safety. |
| `ownerName` | `string` | **Yes** | Name of the user uploading the file. |
| `fileBody` | `string` | **Yes** | The file content encoded as a **Base64 string**. |
| `uploadedAt` | `string` | No | ISO Date string. If omitted, server sets current time. |
| `editedAt` | `string` | No | ISO Date string. Server always updates this on save. |
| `sizeInBytes` | `number` | No | Server calculates this automatically from the file buffer. |

---

### **2. Endpoints**

#### **A. Upload or Update File (PUT)**

This is the primary endpoint for saving files. It handles both creating new files and updating existing ones.

* **Endpoint:** `/files/:filename`
* **Method:** `PUT`
* **URL Parameter:** `:filename` (e.g., `vacation.jpg`). **This is the Master Filename.**
* **Request Body:** `FileDto` (JSON)

**Behavior:**

1. **Inheritance:** The server takes the `:filename` from the URL.
2. **Override:** It forces the `fileName` inside your JSON body to match the URL.
3. **Decode:** It converts `fileBody` (Base64)  Binary File.
4. **Save:**
* **Disk:** Saves the binary file to `uploads/vacation.jpg`.
* **DB:** Saves the metadata (including the Base64 string) to `db.json`.



**Example Request:**
`PUT http://localhost:4000/api/files/duck.png`

```json
{
  "ownerName": "Alice",
  "fileBody": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAA..."
  // "fileName" is optional here because the server will set it to "duck.png"
}

```

#### **B. List All Files (GET)**

Retrieves the metadata for all files stored in the system.

* **Endpoint:** `/files`
* **Method:** `GET`
* **Response:** `200 OK` with an array of `FileDto` objects.

**Example Response:**

```json
[
    {
        "fileName": "duck.png",
        "ownerName": "Alice",
        "uploadedAt": "2026-01-13T10:00:00.000Z",
        "sizeInBytes": 1024,
        "fileBody": "iVBOR..."
    }
]

```

#### **C. Delete File (DELETE)**

Removes a file from both the database and the hard drive.

* **Endpoint:** `/files/:filename`
* **Method:** `DELETE`
* **URL Parameter:** `:filename` (The name of the file to delete).
* **Response:** `200 OK` with the updated list of files.

---

### **3. Typical Data Flow (Frontend Logic)**

When a user uploads a file in your Angular app, the flow is now:

1. **Read File:** The browser reads the selected file.
2. **Convert:** You convert the file to a **Base64 string**.
3. **Prepare Object:** You create a simple object:
```typescript
const payload = {
  ownerName: "CurrentUser",
  fileBody: base64String
};

```


4. **Send:** You call the API using the filename in the URL:
```typescript
http.put(`/api/files/${actualFileName}`, payload)

```


5. **Result:** The server ensures `actualFileName` is used for both the physical file and the database record.