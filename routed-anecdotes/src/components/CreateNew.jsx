import { useNavigate } from 'react-router-dom';
import { useField, useAnecdotes } from '../hooks';

const CreateNew = () => {
  const content = useField('');
  const author = useField('');
  const info = useField('');
  const navigate = useNavigate();

  const { createAnecdote } = useAnecdotes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const anecdote = {
      content: content.value,
      author:author.value,
      info: info.value,
      votes: 0
    };
    reset();
    await createAnecdote(anecdote);
    navigate('/');
  };
  const reset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.form} />
        </div>
        <div>
          author
          <input {...author.form} />
        </div>
        <div>
          url for more info
          <input {...info.form} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={reset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
