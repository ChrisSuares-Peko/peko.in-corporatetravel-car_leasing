import React, { useState } from 'react';

import { Button, Card, Flex, Input, Typography } from 'antd';

const { Text, Title } = Typography;
const { TextArea } = Input;

type Note = {
    key:       string;
    timestamp: string;
    author:    string;
    content:   string;
};

const initialNotes: Note[] = [
    {
        key:       '1',
        timestamp: '25 Jan 2026 at 2:30 PM',
        author:    'Khalid Al Mazrouei',
        content:   'Budget approved by CFO on 18 Jan 2026. Linked to fit-out project.',
    },
];

const now = (): string => {
    const d = new Date();
    return d.toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
    }).replace(',', ' at');
};

const NotesTab: React.FC = () => {
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState<Note[]>(initialNotes);

    const handleAdd = () => {
        const trimmed = noteText.trim();
        if (!trimmed) return;
        setNotes(prev => [
            { key: String(Date.now()), timestamp: now(), author: 'You', content: trimmed },
            ...prev,
        ]);
        setNoteText('');
    };

    return (
        <Flex vertical gap={16}>
            {/* Header */}
            <Flex vertical gap={2}>
                <Title level={5} className="!mb-0">Internal Notes</Title>
                <Text className="text-xs text-gray-400">
                    Add notes as separate entries. Existing notes are preserved as a chronological history.
                </Text>
            </Flex>

            {/* Add note card */}
            <Card className="rounded-xl border border-[#f0f0f0]" styles={{ body: { padding: '16px' } }}>
                <Text className="text-sm font-medium text-[#262626] block mb-3">Add a note</Text>
                <TextArea
                    rows={4}
                    placeholder="Add context for this PO, operational updates or internal decisions..."
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    className="mb-3"
                />
                <Button
                    type="primary"
                    danger
                    size="small"
                    style={{ borderRadius: 6 }}
                    disabled={!noteText.trim()}
                    onClick={handleAdd}
                >
                    Add note
                </Button>
            </Card>

            {/* Existing notes */}
            <Flex vertical gap={12}>
                {notes.map(note => (
                    <Flex key={note.key} vertical gap={4}>
                        <Text className="text-xs text-gray-400">
                            {note.timestamp}
                            <span className="mx-1">·</span>
                            {note.author}
                        </Text>
                        <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>
                            {note.content}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default NotesTab;
