function ToggleButton({ isOn, onToggle, text }) {
  return (
    <label
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        width: 90,
        height: 36,
        backgroundColor: isOn ? '#4caf50' : '#ccc',
        borderRadius: 36,
        transition: 'background-color 0.3s ease',
        fontFamily: 'Arial, sans-serif',
        fontWeight: '600',
        color: 'white',
        fontSize: 14,
        padding: '0 8px',
        boxSizing: 'border-box',
      }}
    >
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
        style={{ display: 'none' }}
      />
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: isOn ? 52 : 4,
          width: 28,
          height: 28,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease',
          zIndex: 2,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: isOn ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
      <span
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: isOn ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
    </label>
  );
}

export default ToggleButton;
