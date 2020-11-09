
export class Breaker {

	public content: string;
	public id: string;
	public category: string;
	public favorite: boolean;

	public from(data): this {
		this.id = data.id;
		this.category = data.category;
		this.content = data.content;
		this.favorite = data.favorite || false;
		return this;
	}

}
