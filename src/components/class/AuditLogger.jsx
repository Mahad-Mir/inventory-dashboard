import React, { Component } from 'react';
import CardWrapper from '../functional/CardWrapper';

export default class AuditLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      toast: null,
    };
    this.timer = null;
  }

  componentDidMount() {
    const savedLogs = localStorage.getItem('audit_logs');
    if (savedLogs) {
      this.setState({ logs: JSON.parse(savedLogs) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.latestAction &&
      (!prevProps.latestAction || prevProps.latestAction.id !== this.props.latestAction.id)
    ) {
      const entry = this.props.latestAction;
      this.setState((state) => ({
        logs: [entry, ...state.logs],
        toast: entry.message,
      }));

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ toast: null });
      }, 2500);
    }

    if (prevState.logs !== this.state.logs) {
      localStorage.setItem('audit_logs', JSON.stringify(this.state.logs));
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { logs, toast } = this.state;

    return (
      <CardWrapper title="Audit Logger">
        {toast && <div className="toast">Notification: {toast}</div>}

        {logs.length === 0 ? (
          <p>No operations logged yet.</p>
        ) : (
          <ul className="log-list">
            {logs.map((log) => (
              <li key={log.id}>
                [{log.timestamp}] {log.message}
              </li>
            ))}
          </ul>
        )}
      </CardWrapper>
    );
  }
}
