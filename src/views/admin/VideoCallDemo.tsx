import React, { useState } from 'react';

export default function VideoCallDemo() {
  const [room, setRoom] = useState('cura-demo-room');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Telemedicine Video Call (Jitsi Demo)</h2>
      {!joined ? (
        <form onSubmit={handleJoin} className="flex flex-col gap-4 mb-8">
          <label className="font-medium">
            Room Name
            <input
              type="text"
              value={room}
              onChange={e => setRoom(e.target.value)}
              className="border rounded px-3 py-2 mt-1 w-full"
              required
            />
          </label>
          <button type="submit" className="px-4 py-2 rounded bg-primary text-white font-semibold w-fit">Join Video Call</button>
        </form>
      ) : (
        <div className="rounded border overflow-hidden" style={{ height: 600 }}>
          <iframe
            title="Jitsi Video Call"
            src={`https://meet.jit.si/${encodeURIComponent(room)}`}
            allow="camera; microphone; fullscreen; display-capture"
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        </div>
      )}
    </div>
  );
} 