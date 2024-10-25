import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const RichTextEditor = () => {
    const richText = useRef();

    return (
        <View style={styles.container}>
            <RichToolbar
                editor={richText}
                actions={['bold', 'italic', 'underline', 'heading1', 'heading2', 'insertOrderedList', 'insertUnorderedList']}
                style={styles.toolbar}
            />
            <RichEditor
                ref={richText}
                style={styles.editor}
                placeholder="Start writing..."
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    toolbar: {
        backgroundColor: '#f1f1f1',
    },
    editor: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default RichTextEditor;
