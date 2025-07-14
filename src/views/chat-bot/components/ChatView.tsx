import { useRef, useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import ChatBox from '@/views/chat-bot/components/ChatBox'
import ChatLandingView from './ChatLandingView'
import ChatCustomContent from './ChatCustomContent'
import ChatCustomAction from './ChatCustomAction'
import { usGenerativeChatStore } from '../store/generativeChatStore'
import useChatSend from '../hooks/useChatSend'
import type { ScrollBarRef } from '@/views/chat-bot/components/ChatBox'
import { apiGetAllMessage, apiGetAllPublicMessage } from '@/services/MessageService'
import { AllMessageResponse } from '../types'
import { generateLLMChatHistory, transformMessages } from '../utils'
import { useAuth } from '@/auth'
import PatientSignUpPopup from '@/views/auth/PatientSignUp/Popup'
import { useLocation, useSearchParams } from 'react-router-dom'
import AppointmentPopup from '@/components/shared/AppointmentPopup'
import staticChats from '../static-chats/index.json'
import { Notification, toast } from '@/components/ui'
import { apiGetSuggestChatForConversation } from '@/services/SuggestionQuestion'
import useResponsive from '@/utils/hooks/useResponsive'
import EnvConfig from '@/configs/env.config'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useAppointmentPopup } from '@/utils/hooks/useAppointmentPopup'

const mockMessages = [
  { id: 1, sender: 'Doctor', text: 'Hello! How can I help you today?', timestamp: '09:00 AM', attachments: [] },
  { id: 2, sender: 'Patient', text: 'I have a headache and fever.', timestamp: '09:01 AM', attachments: [] },
  { id: 3, sender: 'Doctor', text: 'I see. How long have you had these symptoms?', timestamp: '09:02 AM', attachments: [] },
];

const ChatView = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() === '' && attachments.length === 0) return;
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'Patient',
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachments: attachments.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }))
      }
    ]);
    setInput('');
    setAttachments([]);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

    useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

    return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 p-2 border rounded bg-gray-50 dark:bg-gray-800">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-3 flex ${msg.sender === 'Patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl shadow-md relative ${msg.sender === 'Patient' ? 'bg-gradient-to-br from-primary to-blue-500 text-white rounded-tr-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none'}`}
                 style={{ borderBottomRightRadius: msg.sender === 'Patient' ? 0 : undefined, borderBottomLeftRadius: msg.sender === 'Doctor' ? 0 : undefined }}>
              <div className="text-xs font-semibold mb-1 opacity-80">{msg.sender}</div>
              <div className="whitespace-pre-line break-words">{msg.text}</div>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.attachments.map((file: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      {file.type.startsWith('image') ? (
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <img src={file.url} alt={file.name} className="w-20 h-20 object-cover rounded border" />
                        </a>
                      ) : file.type === 'application/pdf' ? (
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline flex items-center gap-1">
                          <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.828A2 2 0 0015.414 7L13 4.586A2 2 0 0011.586 4H6zm2 2h3v3a1 1 0 001 1h3v8a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1h2zm2 1.414L14.586 8H11V5.414z" /></svg>
                          {file.name}
                        </a>
                      ) : (
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline">{file.name}</a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-[10px] text-right mt-1 opacity-70">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-end">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleAttachmentChange}
          className="hidden"
          id="chat-attachment-input"
        />
        <label htmlFor="chat-attachment-input" className="cursor-pointer px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l7.071-7.07a4 4 0 00-5.657-5.657l-7.072 7.07a6 6 0 108.485 8.485L19 13" /></svg>
        </label>
        <button onClick={handleSend} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Send</button>
      </div>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {attachments.map((file, idx) => (
            <div key={idx} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {file.type.startsWith('image') ? (
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-10 h-10 object-cover rounded" />
              ) : file.type === 'application/pdf' ? (
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.828A2 2 0 0015.414 7L13 4.586A2 2 0 0011.586 4H6zm2 2h3v3a1 1 0 001 1h3v8a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1h2zm2 1.414L14.586 8H11V5.414z" /></svg>
              ) : (
                <span className="text-xs">{file.name}</span>
              )}
              <span className="text-xs ml-1">{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatView;
