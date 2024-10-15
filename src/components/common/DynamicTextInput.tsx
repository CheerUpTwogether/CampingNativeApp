
import React, {useState, useCallback} from 'react';
import {TextInput, StyleSheet, View, Text, LayoutChangeEvent} from 'react-native';

const DynamicTextInput = () => {
  const [text, setText] = useState('');
  const [lines, setLines] = useState(1); // 기본 줄 수 1
  const [inputWidth, setInputWidth] = useState(0); // TextInput의 넓이

  // 텍스트 인풋의 레이아웃 변화 감지
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setInputWidth(width); // 현재 TextInput의 너비를 설정
    console.log(width)
  }, []);

  // 텍스트 길이에 따라 줄 수 계산
  const handleTextChange = (value: string) => {
    setText(value);

    // 글자당 너비를 가정하고 (예: 10), 현재 입력된 텍스트의 길이를 확인
    const averageCharWidth = 16; // 글자 하나의 평균 너비 (폰트에 따라 조정 가능)
    const charsPerLine = Math.floor(inputWidth / averageCharWidth); // 한 줄에 들어갈 수 있는 글자 수

    // 입력된 텍스트에 맞는 줄 수 계산 (입력된 글자 수를 한 줄에 들어갈 글자 수로 나눈 값)
    const newLines = Math.ceil(value.length / charsPerLine);

    // 최대 5줄로 제한 (필요시 이 값을 조정 가능)
    setLines(newLines <= 5 ? newLines : 5);
  };

  return (
    <View >
      <TextInput
        style={[styles.textInput]} // 줄 수에 따라 높이 조정
        value={text}
        onChangeText={handleTextChange}
        multiline={true}
        numberOfLines={lines} // 동적으로 계산된 줄 수 적용
        onLayout={onLayout} // TextInput의 레이아웃 변화 감지
        placeholder='댓글을 입력하세요'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#efefef",
  },
});

export default DynamicTextInput;
