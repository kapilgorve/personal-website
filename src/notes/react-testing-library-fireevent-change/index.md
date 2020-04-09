---
title: 'React Testing Library fireEvent.change example'
tags: ['React', 'Testing']
type: 'note'
date: '2020-04-09'
description: 'How to test input element change example'
---
Example -

```tsx
import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import App from './App';

afterEach(cleanup);

it('Enter principal amount', async () => {
  const { getByTestId } = render(<App />);
  const principalInputElement = getByTestId('principalInput') as HTMLInputElement;
  fireEvent.change(principalInputElement, {target: {value: '20000'}});
  expect(getByTestId('emititle')).toHaveTextContent('1758');
});
```