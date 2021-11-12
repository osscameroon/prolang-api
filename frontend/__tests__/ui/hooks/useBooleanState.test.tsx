import { act, renderHook } from '@testing-library/react-hooks';
import { useBooleanState } from "@hooks/useBooleanState";

describe('Test useBooleanState', () => {
  it('should return false by default', () => {
    const { result } = renderHook(useBooleanState);

    expect(result.current[0]).toBe(false);
  });

  it('should set value to true', () => {
    const { result } = renderHook(useBooleanState);

    act(() => {
      const [, setToTrue] = result.current;

      setToTrue();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set value to false', () => {
    const { result } = renderHook(useBooleanState);

    act(() => {
      const [, , setToFalse] = result.current;

      setToFalse();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set value to false', () => {
    const { result } = renderHook(useBooleanState);

    act(() => {
      const [, setToTrue, setToFalse] = result.current;

      setToTrue();
      setToFalse();
    });

    expect(result.current[0]).toBe(false);
  });
});
